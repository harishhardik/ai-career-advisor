@echo off
echo ========================================
echo AI Career Advisor - Deploy to Vercel
echo ========================================
echo.

echo Building and deploying to Vercel...
echo.

echo [1/2] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo Error building project!
    pause
    exit /b 1
)

echo.
echo [2/2] Deploying to Vercel...
call vercel --prod

echo.
echo ========================================
echo Deployment complete!
echo ========================================
echo.
echo Check the output above for your live URL.
echo.
pause

