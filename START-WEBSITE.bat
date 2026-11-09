@echo off
setlocal
cd /d "%~dp0"

echo.
echo  USMAN KHAN - CYBERSECURITY PORTFOLIO
echo  -------------------------------------
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed.
  echo Install Node.js 22 LTS from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)

node -e "const v=process.versions.node.split('.').map(Number); if (!(v[0] > 22 || (v[0] === 22 && v[1] >= 12))) process.exit(1)"
if errorlevel 1 (
  echo ERROR: This project needs Node.js 22.12 or newer.
  echo Install Node.js 22 LTS from https://nodejs.org/ and run this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo ERROR: npm was not found. Reinstall Node.js 22 LTS and try again.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
  echo First launch: installing project packages...
  call npm install
  if errorlevel 1 (
    echo.
    echo ERROR: Package installation failed. Check your internet connection and try again.
    pause
    exit /b 1
  )
)

echo Starting the local website...
start "Usman Khan Portfolio - Vite" cmd /k "cd /d ""%~dp0"" && npm run dev"
timeout /t 4 /nobreak >nul
start "" "http://127.0.0.1:5173"
echo.
echo Website should open at http://127.0.0.1:5173
echo Keep the Vite terminal window open while viewing the website.
echo Close that terminal window to stop the local server.
echo.
endlocal
