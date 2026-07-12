// ============================================================================
// C++ Mastery — Electron Main Process
// Handles window creation, IPC for C++ compilation, and app lifecycle.
// ============================================================================

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { execFile, exec } = require('child_process');

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------
let mainWindow = null;
const TEMP_DIR = path.join(os.tmpdir(), 'cpp-mastery');

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// ---------------------------------------------------------------------------
// Window Creation
// ---------------------------------------------------------------------------
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    frame: false,                // Custom titlebar
    backgroundColor: '#0a0e17',
    icon: path.join(__dirname, 'renderer', 'assets', 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,            // Needed for preload script to use Node APIs
    },
    show: false,                 // Show after ready-to-show to avoid flash
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));

  // Forward renderer console messages to main process stdout for debugging
  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    const levels = ['LOG', 'WARN', 'ERROR'];
    const levelName = levels[level] || 'LOG';
    if (level >= 1) { // Only warnings and errors
      console.log(`[Renderer ${levelName}] ${message} (${sourceId}:${line})`);
    }
  });

  // Smooth show after content is painted
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Open DevTools in dev mode
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }

  // Notify renderer of maximize/unmaximize events (for titlebar UI)
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized-change', true);
  });
  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-maximized-change', false);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ---------------------------------------------------------------------------
// App Lifecycle
// ---------------------------------------------------------------------------
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Clean up temp files
  cleanupTempFiles();
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// ---------------------------------------------------------------------------
// IPC Handlers
// ---------------------------------------------------------------------------

// Window controls (for custom titlebar)
ipcMain.on('window-minimize', () => mainWindow?.minimize());
ipcMain.on('window-maximize', () => {
  if (mainWindow?.isMaximized()) {
    mainWindow.unmaximize();
  } else {
    mainWindow?.maximize();
  }
});
ipcMain.on('window-close', () => mainWindow?.close());
ipcMain.handle('window-is-maximized', () => mainWindow?.isMaximized() ?? false);

// ---------------------------------------------------------------------------
// C++ Compiler Detection
// ---------------------------------------------------------------------------
ipcMain.handle('check-compiler', async () => {
  return new Promise((resolve) => {
    // Try g++ first (MinGW, MSYS2, WSL)
    exec('g++ --version', (error, stdout) => {
      if (!error && stdout) {
        const versionMatch = stdout.match(/(\d+\.\d+\.\d+)/);
        resolve({
          available: true,
          compiler: 'g++',
          version: versionMatch ? versionMatch[1] : 'unknown',
          info: stdout.split('\n')[0].trim(),
        });
        return;
      }

      // Try clang++ as fallback
      exec('clang++ --version', (error2, stdout2) => {
        if (!error2 && stdout2) {
          const versionMatch2 = stdout2.match(/(\d+\.\d+\.\d+)/);
          resolve({
            available: true,
            compiler: 'clang++',
            version: versionMatch2 ? versionMatch2[1] : 'unknown',
            info: stdout2.split('\n')[0].trim(),
          });
          return;
        }

        // No compiler found
        resolve({
          available: false,
          compiler: null,
          version: null,
          info: 'No C++ compiler found. Please install MinGW-w64 or MSYS2.',
        });
      });
    });
  });
});

// ---------------------------------------------------------------------------
// C++ Compilation & Execution
// ---------------------------------------------------------------------------
ipcMain.handle('compile-and-run', async (event, { code, stdinInput, timeoutMs }) => {
  const timestamp = Date.now();
  const sourceFile = path.join(TEMP_DIR, `code_${timestamp}.cpp`);
  const outputFile = path.join(TEMP_DIR, `code_${timestamp}.exe`);
  const timeout = timeoutMs || 10000; // Default 10s timeout

  try {
    // Write source code to temp file
    fs.writeFileSync(sourceFile, code, 'utf-8');

    // Step 1: Compile
    const compileResult = await runProcess('g++', [
      '-std=c++17',
      '-Wall',
      '-Wextra',
      '-o', outputFile,
      sourceFile,
    ], { timeout: 30000 });

    if (compileResult.exitCode !== 0) {
      return {
        compiled: false,
        compileErrors: compileResult.stderr,
        stdout: '',
        stderr: compileResult.stderr,
        exitCode: compileResult.exitCode,
        executionTime: 0,
      };
    }

    // Step 2: Execute
    const startTime = Date.now();
    const runResult = await runProcess(outputFile, [], {
      timeout,
      stdinInput: stdinInput || '',
    });
    const executionTime = Date.now() - startTime;

    return {
      compiled: true,
      compileErrors: compileResult.stderr || '', // Warnings
      stdout: runResult.stdout,
      stderr: runResult.stderr,
      exitCode: runResult.exitCode,
      executionTime,
      timedOut: runResult.timedOut || false,
    };
  } catch (err) {
    return {
      compiled: false,
      compileErrors: err.message,
      stdout: '',
      stderr: err.message,
      exitCode: -1,
      executionTime: 0,
    };
  } finally {
    // Cleanup temp files (async, best-effort)
    setTimeout(() => {
      try { fs.unlinkSync(sourceFile); } catch {}
      try { fs.unlinkSync(outputFile); } catch {}
    }, 1000);
  }
});

// ---------------------------------------------------------------------------
// Process Runner Helper
// ---------------------------------------------------------------------------
function runProcess(command, args, options = {}) {
  return new Promise((resolve) => {
    const { timeout = 10000, stdinInput = '' } = options;

    const proc = execFile(command, args, {
      timeout,
      maxBuffer: 1024 * 1024, // 1MB buffer
      windowsHide: true,
    }, (error, stdout, stderr) => {
      if (error && error.killed) {
        resolve({
          stdout: stdout || '',
          stderr: stderr || 'Process timed out and was terminated.',
          exitCode: -1,
          timedOut: true,
        });
      } else {
        resolve({
          stdout: stdout || '',
          stderr: stderr || '',
          exitCode: error ? error.code || 1 : 0,
          timedOut: false,
        });
      }
    });

    // Send stdin if provided
    if (stdinInput && proc.stdin) {
      proc.stdin.write(stdinInput);
      proc.stdin.end();
    }
  });
}

// ---------------------------------------------------------------------------
// Temp File Cleanup
// ---------------------------------------------------------------------------
function cleanupTempFiles() {
  try {
    if (fs.existsSync(TEMP_DIR)) {
      const files = fs.readdirSync(TEMP_DIR);
      for (const file of files) {
        try {
          fs.unlinkSync(path.join(TEMP_DIR, file));
        } catch {}
      }
    }
  } catch {}
}
