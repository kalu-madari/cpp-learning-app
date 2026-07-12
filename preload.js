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

  /**
   * Compile and run C++ code.
   * @param {Object} options
   * @param {string} options.code - The C++ source code to compile and run
   * @param {string} [options.stdinInput] - Optional stdin input for the program
   * @param {number} [options.timeoutMs] - Execution timeout in milliseconds (default: 10000)
   * @returns {Promise<{
   *   compiled: boolean,
   *   compileErrors: string,
   *   stdout: string,
   *   stderr: string,
   *   exitCode: number,
   *   executionTime: number,
   *   timedOut: boolean
   * }>}
   */
  compileAndRun: (options) => ipcRenderer.invoke('compile-and-run', options),
});
