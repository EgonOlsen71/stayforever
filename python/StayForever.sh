#!/bin/bash

VENV_NAME="venv"
REQUIREMENTS_FILE="requirements.txt"
MAIN_SCRIPT="sf.py"

echo ""
echo "=== Starting Installation and Run Script for Linux/macOS ==="
echo ""

# Function to check the exit status of the last command
check_error() {
    if [ $? -ne 0 ]; then
        echo "ERROR: $1"
        exit 1
    fi
}

# 1. Create a virtual environment if it doesn't exist
if [ -d "$VENV_NAME" ]; then
    echo "Virtual environment '$VENV_NAME' already exists. Skipping creation."
else
    echo "Creating virtual environment..."
    python3 -m venv "$VENV_NAME"
    check_error "Failed to create virtual environment. Is python3 installed?"
    echo "Virtual environment created successfully."
fi

# 2. Activate the virtual environment
echo "Activating virtual environment..."
source "$VENV_NAME/bin/activate"
check_error "Failed to activate virtual environment."
echo "Environment activated."

# 3. Install dependencies from requirements.txt
if [ -f "$REQUIREMENTS_FILE" ]; then
    echo "Installing dependencies from '$REQUIREMENTS_FILE'..."
    pip install -r "$REQUIREMENTS_FILE"
    # Check for installation error, but continue to deactivation if it fails
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies. Check '$REQUIREMENTS_FILE' and internet connection."
        DEACTIVATE_AND_EXIT=true
    else
        echo "Dependencies installed successfully."
    fi
else
    echo "WARNING: '$REQUIREMENTS_FILE' not found. Skipping dependency installation."
fi

# 4. Run the main Python script (only if no critical error occurred)
if [ -z "$DEACTIVATE_AND_EXIT" ]; then
    if [ -f "$MAIN_SCRIPT" ]; then
        echo ""
        echo "=== Starting Python script: $MAIN_SCRIPT ==="
        echo "Sorry, needs SUDO for the keyboard library!"
        sudo python "$MAIN_SCRIPT"
        if [ $? -ne 0 ]; then
            echo "ERROR: The Python script '$MAIN_SCRIPT' failed during execution."
        else
            echo ""
            echo "=== Python script finished successfully. ==="
        fi
    else
        echo "ERROR: Main script '$MAIN_SCRIPT' not found. Cannot run."
    fi
fi

# 5. Deactivate the environment
echo ""
echo "Deactivating virtual environment..."
deactivate

echo ""
echo "=== Script finished. ==="

# Exit based on any critical error during installation or script execution
if [ -n "$DEACTIVATE_AND_EXIT" ]; then
    exit 1
fi