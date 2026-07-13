# C++ Mastery

> Learn C++ from absolute beginner to expert — an interactive desktop app with a built-in code editor, compiler, and structured curriculum.

![Electron](https://img.shields.io/badge/Electron-33-47848F?logo=electron)
![C++](https://img.shields.io/badge/C++-17-00599C?logo=cplusplus)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code_Engine-007ACC)

---

## Features

- **📚 15-Chapter Curriculum** — From "Hello World" to smart pointers and multithreading
- **💻 Built-in Code Editor** — Monaco Editor (VS Code engine) with C++ syntax highlighting, autocomplete, snippets, and line numbers
- **▶️ Compile & Run** — Execute C++ code locally with one click (Ctrl+Enter)
- **✅ Output Verification** — Automatic checking against expected output with mismatch explanations
- **💡 Error Explainer** — Translates cryptic compiler errors into plain English with fix suggestions
- **📝 Interactive Quizzes** — Test your knowledge after each lesson
- **🏋️ Practice Mode** — Guided exercises filtered by difficulty
- **📈 Progress Tracking** — Completion percentage, streaks, and achievements
- **🔖 Bookmarks** — Save lessons for quick access
- **🔍 Search** — Full-text search across all lessons
- **🌙 Dark/Light Theme** — Premium UI with glassmorphism and smooth animations
- **🎯 Achievements** — 16 unlockable milestones to keep you motivated

---

## Prerequisites

### 1. Node.js (v18 or later)

Download and install from [nodejs.org](https://nodejs.org/).

### 2. C++ Compiler (g++)

You need a C++ compiler to compile and run code. **Choose one option:**

#### Option A: MSYS2 (Recommended)
1. Download MSYS2 from [msys2.org](https://www.msys2.org/)
2. Run the installer
3. Open **MSYS2 UCRT64** terminal and run:
   ```bash
   pacman -S mingw-w64-ucrt-x86_64-gcc
   ```
4. Add `C:\msys64\ucrt64\bin` to your **System PATH**:
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - Go to **Advanced** → **Environment Variables**
   - Under **System variables**, find `Path`, click **Edit**
   - Add `C:\msys64\ucrt64\bin`
   - Click OK and restart any terminals

#### Option B: MinGW-w64 (Standalone)
1. Download from [winlibs.com](https://winlibs.com/) (choose UCRT runtime, latest release)
2. Extract the archive to `C:\mingw64`
3. Add `C:\mingw64\bin` to your **System PATH** (same steps as above)

#### Verify installation
Open a **new** command prompt and run:
```bash
g++ --version
```
You should see version info like `g++ (Rev2, Built by MSYS2 project) 14.2.0`.

---

## Quick Start

```bash
# 1. Clone or download the project
cd cpp-learning-app

# 2. Install dependencies
npm install

# 3. Launch the app
npm start
```

The app will open as a desktop window. If no compiler is detected, it will show a setup guide.

### Development Mode

To open DevTools alongside the app:
```bash
npm run dev
```

---

## Project Structure

```
cpp-learning-app/
├── package.json           # Project config & dependencies
├── main.js                # Electron main process (window, IPC, compilation)
├── preload.js             # Secure IPC bridge (contextBridge)
├── renderer/
│   ├── index.html         # App shell with all views
│   ├── css/
│   │   └── styles.css     # Complete design system (dark/light themes)
│   └── js/
│       ├── app.js         # Main application controller
│       └── lessons-data.js # Curriculum content (15 chapters, 50+ lessons)
└── README.md              # This file
```

### Architecture

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Shell | Electron 33 | Desktop window, system integration |
| Editor | Monaco Editor | Code editing with IntelliSense |
| UI | HTML + CSS + Vanilla JS | All views, animations, interactions |
| Compiler | Node.js `child_process` | Safe C++ compilation via g++ |
| Storage | localStorage | Progress, bookmarks, settings |

### Key Design Decisions

- **No frameworks** — Vanilla JS for maximum performance and zero build step
- **Monaco via npm** — Loaded directly from `node_modules` (no CDN dependency)
- **Secure IPC** — `contextIsolation: true`, no Node.js exposure to renderer
- **Safe execution** — Temp files with timeout, auto-cleanup
- **Local-first** — Everything runs offline except Google Fonts

---

## How It Works

### Compilation Flow
1. User writes C++ code in the Monaco editor
2. Clicks **Run** (or Ctrl+Enter)
3. Code is written to a temp file in `%TEMP%/cpp-mastery/`
4. `g++ -std=c++17 -Wall -Wextra` compiles the code
5. If compilation succeeds, the executable runs with a configurable timeout
6. stdout, stderr, and exit code are captured and displayed
7. Output is compared against the lesson's expected output
8. Temp files are cleaned up automatically

### Error Explanation
When compilation fails, the app:
1. Parses the g++ error message
2. Matches it against 13 common error patterns
3. Shows a plain-English explanation and suggested fix

---

## Customization

### Adding New Lessons
Edit `renderer/js/lessons-data.js` to add chapters and lessons. Follow the existing data structure.

### Changing the Theme
Edit CSS custom properties in `renderer/css/styles.css` under `:root` and `[data-theme="light"]`.

### Adjusting Compilation Flags
Edit the `g++` arguments in `main.js` in the `compile-and-run` handler.

---

## Development Verification

To ensure the repository is healthy during development, you can use the following commands:

- `npm test`: runs permanent automated regression tests
- `npm run validate`: compiles/runs deterministic curriculum examples and checks expected output
- `npm run verify`: runs syntax checks, automated tests, and curriculum validation

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| "No compiler found" | Install g++ and add it to PATH. Restart the app. |
| Compilation hangs | Check the execution timeout in Settings (default: 10s) |
| Monaco not loading | Run `npm install` again to ensure `monaco-editor` is downloaded |
| White screen on launch | Check DevTools console (`npm run dev`) for errors |
| Path issues | Ensure `g++` is accessible from a regular `cmd.exe` prompt |

---

## License

MIT — Use it, modify it, learn from it.
