const test = require('node:test');
const assert = require('node:assert');
const path = require('path');
const os = require('os');
const fs = require('fs');
const ExecutionManager = require('../lib/execution-manager.js');

let tempDir;
let execManager;

test.before(() => {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'cpp-mastery-tests-'));
});

test.beforeEach(() => {
  execManager = new ExecutionManager(tempDir);
});

test.afterEach(async () => {
  if (execManager) {
    await execManager.stopAll();
  }
});

test.after(() => {
  if (tempDir && fs.existsSync(tempDir)) {
    const files = fs.readdirSync(tempDir);
    assert.strictEqual(files.length, 0, `Test directory must be empty, found: ${files.join(', ')}`);
    fs.rmdirSync(tempDir);
  }
});

async function waitForCleanup(manager) {
  for (let i = 0; i < 100; i++) {
    if (Object.keys(manager.activeSessions).length === 0) return;
    await new Promise(r => setTimeout(r, 50));
  }
  const remainingIds = Object.keys(manager.activeSessions);
  let remainingFiles = [];
  try {
    remainingFiles = fs.readdirSync(manager.tempDir);
  } catch(e) {}
  assert.fail(`waitForCleanup timed out. Active sessions: ${remainingIds.join(', ')}. Remaining files: ${remainingFiles.join(', ')}`);
}

// Helper for execution manager callbacks
function executeCode(manager, code, inputs = [], timeoutMs = 2000) {
  return new Promise(async (resolve, reject) => {
    let stdout = '';
    let stderr = '';
    let exitCode = null;
    let timedOut = false;
    let stopped = false;
    let error = null;

    const sessionId = 'test-session-' + Date.now() + Math.random();

    let resolved = false;
    const failsafeTimer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        reject(new Error(`executeCode helper timeout: execution did not yield any terminal callback within ${timeoutMs + 10000}ms`));
      }
    }, timeoutMs + 10000);

    const safeResolve = (val) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(failsafeTimer);
        resolve(val);
      }
    };

    const callbacks = {
      onStdout: (id, data) => { stdout += data; },
      onStderr: (id, data) => { stderr += data; },
      onExit: (id, code) => {
        exitCode = code;
        safeResolve({ stdout, stderr, exitCode, timedOut, stopped, error });
      },
      onTimeout: (id) => {
        timedOut = true;
        safeResolve({ stdout, stderr, exitCode, timedOut, stopped, error });
      },
      onStopped: (id) => {
        stopped = true;
        safeResolve({ stdout, stderr, exitCode, timedOut, stopped, error });
      },
      onError: (id, err) => {
        error = err;
        safeResolve({ stdout, stderr, exitCode, timedOut, stopped, error });
      }
    };

    const result = await manager.startExecution({ code, sessionId, timeoutMs }, callbacks);

    if (!result.success) {
      safeResolve({
        success: false,
        phase: result.phase,
        compilerOutput: result.compilerOutput,
        error: result.error
      });
      return;
    }

    // Event-driven stdin sending
    const checkReadyAndSend = async () => {
      // Small delay to ensure process is fully up
      await new Promise(r => setTimeout(r, 100));
      for (const input of inputs) {
        manager.sendStdin(sessionId, input);
        await new Promise(r => setTimeout(r, 50));
      }
    };
    checkReadyAndSend();
  });
}

test('Execution: Simple Execution', async () => {
  const code = `
    #include <iostream>
    int main() {
        std::cout << "Hello, World!\\n";
        return 0;
    }
  `;
  const result = await executeCode(execManager, code);
  assert.strictEqual(result.exitCode, 0);
  assert.strictEqual(result.stdout.trim(), 'Hello, World!');

  await waitForCleanup(execManager);
  const files = fs.readdirSync(tempDir);
  assert.strictEqual(files.length, 0);
  assert.strictEqual(Object.keys(execManager.activeSessions).length, 0);
});

test('Execution: Compilation Failure', async () => {
  const code = `
    #include <iostream>
    int main() {
        std::cout << "Missing semicolon\\n"
        return 0;
    }
  `;
  const result = await executeCode(execManager, code);
  assert.strictEqual(result.success, false);
  assert.strictEqual(result.phase, 'compile');
  assert.ok(result.compilerOutput.includes('error:'));

  await waitForCleanup(execManager);
  const files = fs.readdirSync(tempDir);
  assert.strictEqual(files.length, 0);
  assert.strictEqual(Object.keys(execManager.activeSessions).length, 0);
});

test('Execution: Nonzero exit code', async () => {
  const code = `
    int main() {
        return 7;
    }
  `;
  const result = await executeCode(execManager, code);
  assert.strictEqual(result.exitCode, 7);

  await waitForCleanup(execManager);
  const files = fs.readdirSync(tempDir);
  assert.strictEqual(files.length, 0);
  assert.strictEqual(Object.keys(execManager.activeSessions).length, 0);
});

test('Execution: Single STDIN Write', async () => {
  const code = `
    #include <iostream>
    int main() {
        int x;
        std::cin >> x;
        std::cout << x;
        return 0;
    }
  `;
  const result = await executeCode(execManager, code, ['16\n']);
  assert.strictEqual(result.exitCode, 0);
  assert.strictEqual(result.stdout.trim(), '16');
});

test('Execution: Multiple STDIN Writes', async () => {
  const code = `
    #include <iostream>
    #include <string>
    int main() {
        std::string name;
        int age;
        std::getline(std::cin, name);
        std::cin >> age;
        std::cout << name << ":" << age << "\\n";
        return 0;
    }
  `;
  const result = await executeCode(execManager, code, ['Naveen\n', '20\n']);
  assert.strictEqual(result.exitCode, 0);
  assert.strictEqual(result.stdout.trim(), 'Naveen:20');
});

test('Execution: Close STDIN / EOF', async () => {
  const code = `
    #include <iostream>
    #include <string>
    int main() {
        std::string line;
        int count = 0;
        while (std::getline(std::cin, line)) {
            ++count;
        }
        std::cout << count << "\\n";
        return 0;
    }
  `;

  const sessionId = 'test-session-eof';
  let stdout = '';
  let exitCode = null;

  const resultPromise = new Promise(async (resolve) => {
    const callbacks = {
      onStdout: (id, data) => { stdout += data; },
      onExit: (id, code) => { exitCode = code; resolve(); },
    };

    const res = await execManager.startExecution({ code, sessionId, timeoutMs: 3000 }, callbacks);
    assert.strictEqual(res.success, true);

    await new Promise(r => setTimeout(r, 100));
    execManager.sendStdin(sessionId, 'one\n');
    await new Promise(r => setTimeout(r, 50));
    execManager.sendStdin(sessionId, 'two\n');
    await new Promise(r => setTimeout(r, 50));
    execManager.closeStdin(sessionId);
  });

  await resultPromise;
  assert.strictEqual(exitCode, 0);
  assert.strictEqual(stdout.trim(), '2');
});

test('Execution: Send after STDIN closed', async () => {
  const code = `
    #include <iostream>
    int main() {
        int x;
        std::cin >> x;
        return 0;
    }
  `;

  const sessionId = 'test-session-closed';
  const callbacks = { onExit: () => {} };
  await execManager.startExecution({ code, sessionId, timeoutMs: 2000 }, callbacks);

  execManager.closeStdin(sessionId);
  const writeResult = execManager.sendStdin(sessionId, '10\n');
  assert.strictEqual(writeResult.success, false);

  // Need to wait for exit to avoid unhandled rejections/abandoned processes in tests
  await new Promise(r => setTimeout(r, 500));
});

test('Execution: Stop long-running process', async () => {
  const code = `
    #include <iostream>
    #ifdef _WIN32
    #include <windows.h>
    #else
    #include <unistd.h>
    #endif
    int main() {
        #ifdef _WIN32
        Sleep(5000);
        #else
        sleep(5);
        #endif
        return 0;
    }
  `;

  const sessionId = 'test-session-stop';
  let stoppedCount = 0;
  let exitCount = 0;
  let timeoutCount = 0;

  const resultPromise = new Promise(async (resolve) => {
    const callbacks = {
      onStopped: () => { stoppedCount++; resolve(); },
      onExit: () => { exitCount++; resolve(); },
      onTimeout: () => { timeoutCount++; resolve(); }
    };
    await execManager.startExecution({ code, sessionId, timeoutMs: 1200 }, callbacks);
    setTimeout(() => {
      const stopRes = execManager.stopExecution(sessionId);
      assert.strictEqual(stopRes.success, true);
    }, 200);
  });

  await resultPromise;

  await waitForCleanup(execManager);

  // wait longer than the original 1200ms timeout to prove no timeout event triggers
  await new Promise(r => setTimeout(r, 1500));

  await waitForCleanup(execManager);

  assert.strictEqual(stoppedCount, 1);
  assert.strictEqual(exitCount, 0);
  assert.strictEqual(timeoutCount, 0);
  assert.strictEqual(Object.keys(execManager.activeSessions).length, 0);
  assert.strictEqual(fs.readdirSync(tempDir).length, 0);
});

test('Execution: Timeout', async () => {
  const code = `
    #include <iostream>
    int main() {
        while(true) {}
        return 0;
    }
  `;

  const sessionId = 'test-session-timeout';
  let stoppedCount = 0;
  let exitCount = 0;
  let timeoutCount = 0;

  const resultPromise = new Promise(async (resolve) => {
    const callbacks = {
      onStopped: () => { stoppedCount++; resolve(); },
      onExit: () => { exitCount++; resolve(); },
      onTimeout: () => { timeoutCount++; resolve(); }
    };
    await execManager.startExecution({ code, sessionId, timeoutMs: 200 }, callbacks);
  });

  await resultPromise;
  await waitForCleanup(execManager);

  // wait an additional short bounded interval to prove no duplicate terminal callbacks
  await new Promise(r => setTimeout(r, 300));

  assert.strictEqual(timeoutCount, 1);
  assert.strictEqual(stoppedCount, 0);
  assert.strictEqual(exitCount, 0);
  assert.strictEqual(Object.keys(execManager.activeSessions).length, 0);
  assert.strictEqual(fs.readdirSync(tempDir).length, 0);
});

test('Execution: Repeated execution', async () => {
  const code = `
    #include <iostream>
    int main() {
        std::cout << "Test\\n";
        return 0;
    }
  `;

  for (let i = 0; i < 3; i++) {
    const result = await executeCode(execManager, code);
    assert.strictEqual(result.exitCode, 0);
    assert.strictEqual(result.stdout.trim(), 'Test');
    await waitForCleanup(execManager);
    assert.strictEqual(Object.keys(execManager.activeSessions).length, 0);
    assert.strictEqual(fs.readdirSync(tempDir).length, 0);
  }
});

test('Execution: stopAll() cleanup', async () => {
  const code = `
    #include <iostream>
    #ifdef _WIN32
    #include <windows.h>
    #else
    #include <unistd.h>
    #endif
    int main() {
        #ifdef _WIN32
        Sleep(5000);
        #else
        sleep(5);
        #endif
        return 0;
    }
  `;

  const p1 = execManager.startExecution({ code, sessionId: 's1', timeoutMs: 5000 }, {});
  const p2 = execManager.startExecution({ code, sessionId: 's2', timeoutMs: 5000 }, {});

  await Promise.all([p1, p2]);

  assert.strictEqual(Object.keys(execManager.activeSessions).length, 2);
  assert.ok(fs.readdirSync(tempDir).length >= 2);

  await execManager.stopAll();

  assert.strictEqual(Object.keys(execManager.activeSessions).length, 0);
  assert.strictEqual(fs.readdirSync(tempDir).length, 0);
});
