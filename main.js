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
const ExecutionManager = require('./lib/execution-manager.js');
const executionManager = new ExecutionManager(TEMP_DIR);

ipcMain.handle('start-execution', async (event, options) => {
  return await executionManager.startExecution(options, {
    onStdout: (sessionId, data) => event.sender.send('execution-stdout', { sessionId, data }),
    onStderr: (sessionId, data) => event.sender.send('execution-stderr', { sessionId, data }),
    onTimeout: (sessionId) => event.sender.send('execution-timeout', { sessionId }),
    onStopped: (sessionId) => event.sender.send('execution-stopped', { sessionId }),
    onExit: (sessionId, exitCode) => event.sender.send('execution-exit', { sessionId, exitCode }),
    onError: (sessionId, error) => event.sender.send('execution-error', { sessionId, error })
  });
});

ipcMain.handle('send-stdin', async (event, { sessionId, input }) => {
  return executionManager.sendStdin(sessionId, input);
});

ipcMain.handle('close-stdin', async (event, { sessionId }) => {
  const result = executionManager.closeStdin(sessionId);
  if (result.success) {
    event.sender.send('stdin-closed', { sessionId });
  }
  return result;
});

ipcMain.handle('stop-execution', async (event, { sessionId }) => {
  return executionManager.stopExecution(sessionId);
});

let shutdownInProgress = false;

app.on('before-quit', async (event) => {
  if (shutdownInProgress) return;
  if (Object.keys(executionManager.activeSessions).length === 0) return;

  event.preventDefault();
  shutdownInProgress = true;

  try {
    await executionManager.stopAll();
  } catch (err) {
    console.error('Error during shutdown cleanup:', err);
  } finally {
    app.quit();
  }
});


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
