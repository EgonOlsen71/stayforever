@echo off
set "VENV_NAME=venv"
set "REQUIREMENTS_FILE=requirements.txt"
set "MAIN_SCRIPT=sf.py"

echo.
echo === Starting Installation and Run Script for Windows ===
echo.

:: 1. Check if a virtual environment already exists
if exist "%VENV_NAME%" (
    echo Virtual environment "%VENV_NAME%" already exists. Skipping creation.
) else (
    :: 1a. Create virtual environment
    echo Creating virtual environment...
    python -m venv "%VENV_NAME%"
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment. Is Python installed?
        goto :end
    )
    echo Virtual environment created successfully.
)

:: 2. Activate the virtual environment
echo Activating virtual environment...
call "%VENV_NAME%\Scripts\activate.bat"
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment.
    goto :end
)
echo Environment activated.

:: 3. Install dependencies from requirements.txt
if exist "%REQUIREMENTS_FILE%" (
    echo Installing dependencies from "%REQUIREMENTS_FILE%"...
    pip install -r "%REQUIREMENTS_FILE%"
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies. Check "%REQUIREMENTS_FILE%" and internet connection.
        goto :end_deactivate
    )
    echo Dependencies installed successfully.
) else (
    echo WARNING: "%REQUIREMENTS_FILE%" not found. Skipping dependency installation.
)

:: 4. Run the main Python script
if exist "%MAIN_SCRIPT%" (
    echo.
    echo === Starting Python script: %MAIN_SCRIPT% ===
    python "%MAIN_SCRIPT%"
    if errorlevel 1 (
        echo ERROR: The Python script "%MAIN_SCRIPT%" failed during execution.
    ) else (
        echo.
        echo === Python script finished successfully. ===
    )
) else (
    echo ERROR: Main script "%MAIN_SCRIPT%" not found. Cannot run.
)

:: 5. Deactivate the environment and exit
:end_deactivate
echo.
echo Deactivating virtual environment...
call deactivate

:end
echo.
echo === Script finished. ===
pause