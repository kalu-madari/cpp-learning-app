@echo off
setlocal EnableExtensions
title C++ Mastery Installer

cd /d "%~dp0"

echo ==========================================
echo          C++ MASTERY INSTALLER
echo ==========================================
echo.

:: Check Node.js
where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Install Node.js, then run this installer again.
    pause
    exit /b 1
)

:: Check npm
where npm >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed or not in PATH.
    pause
    exit /b 1
)

echo [OK] Node.js found:
node --version

echo [OK] npm found:
call npm --version

echo.

:: Install dependencies
if not exist "node_modules\electron\dist\electron.exe" (
    echo [INFO] Installing project dependencies...
    call npm install

    if errorlevel 1 (
        echo.
        echo [ERROR] npm install failed.
        pause
        exit /b 1
    )
) else (
    echo [OK] Project dependencies already installed.
)

echo.

:: Check C++ compiler
where g++ >nul 2>&1

if errorlevel 1 (
    :: Check standard MSYS2 UCRT64 location
    if exist "C:\msys64\ucrt64\bin\g++.exe" (
        echo [OK] Found g++ in MSYS2 UCRT64.
        echo [INFO] Adding MSYS2 compiler directory to User PATH...

        powershell -NoProfile -ExecutionPolicy Bypass -Command ^
        "$p=[Environment]::GetEnvironmentVariable('Path','User');" ^
        "$dir='C:\msys64\ucrt64\bin';" ^
        "if (($p -split ';') -notcontains $dir) {" ^
        "[Environment]::SetEnvironmentVariable('Path', (($p.TrimEnd(';') + ';' + $dir).Trim(';')), 'User')" ^
        "}"

        set "PATH=%PATH%;C:\msys64\ucrt64\bin"
    ) else (
        echo [WARNING] C++ compiler was not found.
        echo.
        echo Install MSYS2 and the UCRT64 GCC compiler:
        echo     pacman -S mingw-w64-ucrt-x86_64-gcc
        echo.
        echo The app will still be installed, but code execution
        echo will not work until g++ is available.
    )
) else (
    echo [OK] C++ compiler found:
    g++ --version | findstr /i "g++"
)

echo.

:: Create launcher BAT
echo [INFO] Creating launcher...

(
echo @echo off
echo cd /d "%~dp0"
echo call npm start
) > "start-cpp-mastery.bat"

:: Create hidden launcher VBS
(
echo Set shell = CreateObject^("WScript.Shell"^)
echo shell.CurrentDirectory = "%~dp0"
echo shell.Run "cmd /c start-cpp-mastery.bat", 0, False
) > "start-cpp-mastery.vbs"

:: Create Desktop shortcut
echo [INFO] Creating Desktop shortcut...

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
"$desktop=[Environment]::GetFolderPath('Desktop');" ^
"$shortcut=(New-Object -ComObject WScript.Shell).CreateShortcut($desktop + '\C++ Mastery.lnk');" ^
"$shortcut.TargetPath=(Join-Path (Get-Location) 'start-cpp-mastery.vbs');" ^
"$shortcut.WorkingDirectory=(Get-Location).Path;" ^
"$icon=(Join-Path (Get-Location) 'assets\icon.ico');" ^
"if (Test-Path $icon) {$shortcut.IconLocation=$icon};" ^
"$shortcut.Description='Learn, Practice, and Master C++';" ^
"$shortcut.Save()"

if errorlevel 1 (
    echo [WARNING] Could not create Desktop shortcut.
) else (
    echo [OK] Desktop shortcut created.
)

echo.
echo ==========================================
echo          INSTALLATION COMPLETE
echo ==========================================
echo.
echo Project:
echo %CD%
echo.
echo Desktop shortcut:
echo C++ Mastery
echo.

choice /C YN /M "Launch C++ Mastery now"

if errorlevel 2 goto END

start "" "start-cpp-mastery.vbs"

:END
echo.
echo Setup finished.
pause

endlocal