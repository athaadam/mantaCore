@echo off
echo Running Laravel setup...

REM Cek jika .env belum ada, salin dari .env.example
IF NOT EXIST ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env > nul
) ELSE (
    echo .env already exists, skipping copy.
)

REM Generate APP_KEY
echo Generating APP_KEY...
php artisan key:generate

echo Setup complete.
pause
