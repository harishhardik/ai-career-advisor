@echo off
echo ========================================
echo AI Career Advisor by EPIC BYTES
echo ========================================
echo.
echo Starting the complete project...
echo.

echo [1/3] Installing dependencies...
call npm run install:all
if %errorlevel% neq 0 (
    echo Error installing dependencies!
    pause
    exit /b 1
)

echo.
echo [2/3] Starting backend server...
start "Backend Server" cmd /k "cd backend && npm start"

echo.
echo [3/3] Starting frontend server...
timeout /t 3 /nobreak >nul
start "Frontend Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Project started successfully!
echo ========================================
echo.
echo Backend: http://localhost:5001
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window...
pause >nul

