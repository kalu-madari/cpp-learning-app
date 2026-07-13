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
let activeSessions = {};

function killProcess(proc) {
  if (!proc) return;
  try {
    if (process.platform === 'win32') {
      exec(`taskkill /pid ${proc.pid} /t /f`);
    } else {
      proc.kill();
    }
  } catch (e) {
    // Ignore
  }
}

ipcMain.handle('start-execution', async (event, { code, sessionId, timeoutMs }) => {
  const timestamp = Date.now();
  const sourceFile = path.join(TEMP_DIR, `code_${timestamp}.cpp`);
  const outputFile = path.join(TEMP_DIR, `code_${timestamp}.exe`);
  const timeout = timeoutMs || 10000;

  try {
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
        success: false,
        phase: 'compile',
        error: 'Compilation failed',
        compilerOutput: compileResult.stderr,
      };
    }

    // Step 2: Execute
    // Cleanup any existing session with this ID
    if (activeSessions[sessionId]) {
      killProcess(activeSessions[sessionId].proc);
    }

    const proc = spawn(outputFile, [], {
      cwd: TEMP_DIR,
      windowsHide: true,
    });

    let isTimeout = false;
    let timer = setTimeout(() => {
      isTimeout = true;
      killProcess(proc);
    }, timeout);

    const session = {
      proc,
      timer,
      sourceFile,
      outputFile,
    };
    activeSessions[sessionId] = session;

    proc.stdout.on('data', (data) => {
      event.sender.send('execution-stdout', { sessionId, data: data.toString() });
    });

    proc.stderr.on('data', (data) => {
      event.sender.send('execution-stderr', { sessionId, data: data.toString() });
    });

    proc.on('close', (code, signal) => {
      clearTimeout(timer);
      delete activeSessions[sessionId];

      setTimeout(() => {
        try { fs.unlinkSync(sourceFile); } catch {}
        try { fs.unlinkSync(outputFile); } catch {}
      }, 1000);

      if (isTimeout) {
        event.sender.send('execution-timeout', { sessionId });
      } else if (signal === 'SIGTERM' || signal === 'SIGKILL' || (code === null && signal != null)) {
        event.sender.send('execution-stopped', { sessionId });
      } else {
        event.sender.send('execution-exit', { sessionId, exitCode: code });
      }
    });

    proc.on('error', (err) => {
      event.sender.send('execution-error', { sessionId, error: err.message });
    });

    return {
      success: true,
      sessionId: sessionId,
      started: true
    };
  } catch (err) {
    return {
      success: false,
      phase: 'ipc',
      error: err.message,
    };
  }
});

ipcMain.handle('send-stdin', async (event, { sessionId, input }) => {
  const session = activeSessions[sessionId];
  if (session && session.proc && session.proc.stdin && session.proc.stdin.writable) {
    try {
      session.proc.stdin.write(input);
      return { success: true, sessionId };
    } catch (e) {
      return { success: false, sessionId, error: e.message };
    }
  }
  return { success: false, sessionId, error: 'Session or writable stdin not found' };
});

ipcMain.handle('close-stdin', async (event, { sessionId }) => {
  const session = activeSessions[sessionId];
  if (session && session.proc && session.proc.stdin && !session.proc.stdin.destroyed) {
    try {
      session.proc.stdin.end();
      event.sender.send('stdin-closed', { sessionId });
      return { success: true, sessionId };
    } catch (e) {
      return { success: false, sessionId, error: e.message };
    }
  }
  return { success: false, sessionId, error: 'Session or valid stdin not found' };
});

ipcMain.handle('stop-execution', async (event, { sessionId }) => {
  if (activeSessions[sessionId]) {
    killProcess(activeSessions[sessionId].proc);
    return { success: true, sessionId };
  }
  return { success: false, sessionId, error: 'Session not found' };
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
