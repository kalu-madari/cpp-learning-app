// ============================================================================
// C++ Mastery — Preload Script
// Exposes safe IPC bridges to the renderer via contextBridge.
// ============================================================================

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // -------------------------------------------------------------------------
  // Window Controls (custom titlebar)
  // -------------------------------------------------------------------------
  windowMinimize: () => ipcRenderer.send('window-minimize'),
  windowMaximize: () => ipcRenderer.send('window-maximize'),
  windowClose: () => ipcRenderer.send('window-close'),
  windowIsMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  onMaximizedChange: (callback) => {
    ipcRenderer.on('window-maximized-change', (_, isMaximized) => callback(isMaximized));
  },

  // -------------------------------------------------------------------------
  // C++ Compiler
  // -------------------------------------------------------------------------
  
  /**
   * Check if a C++ compiler is available on the system.
   * @returns {Promise<{available: boolean, compiler: string, version: string, info: string}>}
   */
  checkCompiler: () => ipcRenderer.invoke('check-compiler'),

  startExecution: (options) => ipcRenderer.invoke('start-execution', options),
  sendStdin: (options) => ipcRenderer.invoke('send-stdin', options),
  closeStdin: (options) => ipcRenderer.invoke('close-stdin', options),
  stopExecution: (options) => ipcRenderer.invoke('stop-execution', options),

  onExecutionStdout: (callback) => {
    ipcRenderer.removeAllListeners('execution-stdout');
    ipcRenderer.on('execution-stdout', (_, data) => callback(data));
  },
  onExecutionStderr: (callback) => {
    ipcRenderer.removeAllListeners('execution-stderr');
    ipcRenderer.on('execution-stderr', (_, data) => callback(data));
  },
  onExecutionExit: (callback) => {
    ipcRenderer.removeAllListeners('execution-exit');
    ipcRenderer.on('execution-exit', (_, data) => callback(data));
  },
  onExecutionTimeout: (callback) => {
    ipcRenderer.removeAllListeners('execution-timeout');
    ipcRenderer.on('execution-timeout', (_, data) => callback(data));
  },
  onExecutionError: (callback) => {
    ipcRenderer.removeAllListeners('execution-error');
    ipcRenderer.on('execution-error', (_, data) => callback(data));
  },
  onExecutionStopped: (callback) => {
    ipcRenderer.removeAllListeners('execution-stopped');
    ipcRenderer.on('execution-stopped', (_, data) => callback(data));
  },
  onStdinClosed: (callback) => {
    ipcRenderer.removeAllListeners('stdin-closed');
    ipcRenderer.on('stdin-closed', (_, data) => callback(data));
  },
});
