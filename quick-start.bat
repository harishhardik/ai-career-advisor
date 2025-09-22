@echo off
echo ========================================
echo AI Career Advisor - Quick Start
echo ========================================
echo.

echo Starting both servers simultaneously...
echo.

start "Backend Server" cmd /k "cd backend && npm start"
timeout /t 2 /nobreak >nul
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Servers starting...
echo ========================================
echo.
echo Backend: http://localhost:5001
echo Frontend: http://localhost:5173
echo.
echo Both servers are starting in separate windows.
echo Close this window when done.
echo.
timeout /t 5 /nobreak >nul

