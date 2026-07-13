const { spawn, execSync, execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

class ExecutionManager {
  constructor(tempDir) {
    this.tempDir = tempDir;
    this.activeSessions = {};
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  killProcess(proc) {
    if (!proc) return;
    try {
      if (process.platform === 'win32') {
        execSync(`taskkill /pid ${proc.pid} /t /f`, { stdio: 'ignore' });
      } else {
        proc.kill();
      }
    } catch (e) {
      // Ignore
    }
  }

  async cleanupFile(filePath, maxRetries = 20, delayMs = 100) {
    if (!filePath) return true;
    for (let i = 0; i < maxRetries; i++) {
      try {
        if (!fs.existsSync(filePath)) return true;
        fs.unlinkSync(filePath);
        return true;
      } catch (err) {
        if (err.code === 'ENOENT') return true;
        if (i === maxRetries - 1) {
          console.error(`Failed to cleanup ${filePath}:`, err.message);
          return false;
        }
        await new Promise(r => setTimeout(r, delayMs));
      }
    }
    return false;
  }

  cleanupSession(sessionId, sessionInfo) {
    if (!sessionInfo) return Promise.resolve();
    if (sessionInfo.cleanupPromise) return sessionInfo.cleanupPromise;

    sessionInfo.cleanupPromise = (async () => {
      if (sessionInfo.timer) clearTimeout(sessionInfo.timer);
      this.killProcess(sessionInfo.proc);
      await this.cleanupFile(sessionInfo.sourceFile);
      await this.cleanupFile(sessionInfo.outputFile);
      delete this.activeSessions[sessionId];
    })();
    return sessionInfo.cleanupPromise;
  }

  runProcess(command, args, options = {}) {
    return new Promise((resolve) => {
      const { timeout = 10000, stdinInput = '' } = options;

      const proc = execFile(command, args, {
        timeout,
        maxBuffer: 1024 * 1024,
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

      if (stdinInput && proc.stdin) {
        proc.stdin.write(stdinInput);
        proc.stdin.end();
      }
    });
  }

  async startExecution(options, callbacks) {
    const { code, sessionId, timeoutMs } = options;
    const timestamp = Date.now() + '_' + Math.floor(Math.random() * 10000);
    const sourceFile = path.join(this.tempDir, `code_${timestamp}.cpp`);
    const outputFile = path.join(this.tempDir, `code_${timestamp}.exe`);
    const timeout = timeoutMs || 10000;

    try {
      fs.writeFileSync(sourceFile, code, 'utf-8');

      const compileResult = await this.runProcess('g++', [
        '-std=c++17',
        '-Wall',
        '-Wextra',
        '-o', outputFile,
        sourceFile,
      ], { timeout: 30000 });

      if (compileResult.exitCode !== 0) {
        await this.cleanupFile(sourceFile);
        return {
          success: false,
          phase: 'compile',
          error: 'Compilation failed',
          compilerOutput: compileResult.stderr,
        };
      }

      if (this.activeSessions[sessionId]) {
        await this.cleanupSession(sessionId, this.activeSessions[sessionId]);
      }

      const proc = spawn(outputFile, [], {
        cwd: this.tempDir,
        windowsHide: true,
      });

      const session = {
        proc,
        timer: null,
        sourceFile,
        outputFile,
        isStopped: false,
        isTimeout: false,
        completed: false
      };

      session.timer = setTimeout(() => {
        session.isTimeout = true;
        this.killProcess(proc);
      }, timeout);

      this.activeSessions[sessionId] = session;

      proc.stdout.on('data', (data) => {
        if (callbacks.onStdout) callbacks.onStdout(sessionId, data.toString());
      });

      proc.stderr.on('data', (data) => {
        if (callbacks.onStderr) callbacks.onStderr(sessionId, data.toString());
      });

      proc.on('close', async (code, signal) => {
        if (session.completed) return;
        session.completed = true;

        if (session.isTimeout) {
          if (callbacks.onTimeout) callbacks.onTimeout(sessionId);
        } else if (session.isStopped || signal === 'SIGTERM' || signal === 'SIGKILL' || (code === null && signal != null)) {
          if (callbacks.onStopped) callbacks.onStopped(sessionId);
        } else {
          if (callbacks.onExit) callbacks.onExit(sessionId, code);
        }

        await this.cleanupSession(sessionId, session);
      });

      proc.on('error', (err) => {
        if (callbacks.onError) callbacks.onError(sessionId, err.message);
      });

      return {
        success: true,
        sessionId: sessionId,
        started: true
      };
    } catch (err) {
      await this.cleanupFile(sourceFile);
      await this.cleanupFile(outputFile);
      return {
        success: false,
        phase: 'ipc',
        error: err.message,
      };
    }
  }

  sendStdin(sessionId, input) {
    const session = this.activeSessions[sessionId];
    if (session && session.proc && session.proc.stdin && session.proc.stdin.writable) {
      try {
        session.proc.stdin.write(input);
        return { success: true, sessionId };
      } catch (e) {
        return { success: false, sessionId, error: e.message };
      }
    }
    return { success: false, sessionId, error: 'Session or writable stdin not found' };
  }

  closeStdin(sessionId) {
    const session = this.activeSessions[sessionId];
    if (session && session.proc && session.proc.stdin && !session.proc.stdin.destroyed) {
      try {
        session.proc.stdin.end();
        return { success: true, sessionId };
      } catch (e) {
        return { success: false, sessionId, error: e.message };
      }
    }
    return { success: false, sessionId, error: 'Session or valid stdin not found' };
  }

  stopExecution(sessionId) {
    const session = this.activeSessions[sessionId];
    if (session) {
      session.isStopped = true;
      this.killProcess(session.proc);
      return { success: true, sessionId };
    }
    return { success: false, sessionId, error: 'Session not found' };
  }

  async stopAll() {
    const sessions = Object.values(this.activeSessions);
    const sessionIds = Object.keys(this.activeSessions);
    for (const sessionId of sessionIds) {
       this.activeSessions[sessionId].isStopped = true;
       this.killProcess(this.activeSessions[sessionId].proc);
    }
    const promises = sessionIds.map(id => this.cleanupSession(id, this.activeSessions[id]));
    await Promise.all(promises);
  }
}

module.exports = ExecutionManager;
