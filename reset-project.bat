@echo off
echo ========================================
echo AI Career Advisor - Reset Project
echo ========================================
echo.

echo This will clean and reset the entire project.
echo Are you sure? (Y/N)
set /p choice=

if /i "%choice%"=="Y" (
    echo.
    echo [1/3] Stopping all processes...
    taskkill /f /im node.exe 2>nul
    
    echo.
    echo [2/3] Cleaning project...
    call npm run clean
    
    echo.
    echo [3/3] Reinstalling dependencies...
    call npm run install:all
    
    echo.
    echo ========================================
    echo Project reset complete!
    echo ========================================
    echo.
    echo Run start-project.bat to start fresh.
) else (
    echo Reset cancelled.
)

echo.
pause

