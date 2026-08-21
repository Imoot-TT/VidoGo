const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const root = path.resolve(__dirname, '..');
const electronPath = process.platform === 'win32'
  ? path.join(root, 'node_modules', 'electron', 'dist', 'electron.exe')
  : path.join(root, 'node_modules', '.bin', 'electron');
const resultPath = path.join(os.tmpdir(), 'vidogo-smoke-result.json');
const screenshotPath = path.join(os.tmpdir(), 'vidogo-smoke-home.png');

for (const file of [resultPath, screenshotPath]) {
  try {
    fs.unlinkSync(file);
  } catch {
    // Ignore stale-file cleanup failures.
  }
}

const child = spawn(electronPath, ['.'], {
  cwd: root,
  detached: false,
  stdio: 'ignore',
  env: {
    ...process.env,
    ELECTRON_SMOKE_TEST: '1',
    ELECTRON_SMOKE_RESULT: resultPath,
    ELECTRON_SMOKE_SCREENSHOT: screenshotPath,
  },
});

const startedAt = Date.now();
const timeoutMs = 25000;

function readResult() {
  if (!fs.existsSync(resultPath)) return null;
  return JSON.parse(fs.readFileSync(resultPath, 'utf8'));
}

function poll() {
  const result = readResult();
  if (result) {
    if (!result.ok) {
      console.error(JSON.stringify(result, null, 2));
      process.exit(1);
    }
    console.log(JSON.stringify({
      ...result,
      screenshotPath,
      screenshotBytes: fs.existsSync(screenshotPath) ? fs.statSync(screenshotPath).size : 0,
    }, null, 2));
    process.exit(0);
  }
  if (Date.now() - startedAt > timeoutMs) {
    try {
      child.kill();
    } catch {
      // Ignore cleanup failures on timeout.
    }
    console.error(`Electron smoke test timed out after ${timeoutMs}ms`);
    process.exit(1);
  }
  setTimeout(poll, 250);
}

poll();
