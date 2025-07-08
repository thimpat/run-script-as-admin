# Run Script as Admin

This Visual Studio Code extension allows you to run PowerShell scripts with elevated (Administrator) privileges using a simple command.

## Features

- Adds a command to the Command Palette: `Run PowerShell Script as Admin`
- Prompts you to select a `.ps1` file
- Launches the script with UAC elevation using `Start-Process -Verb RunAs`

## Usage

1. Open the Command Palette (`Ctrl+Shift+P`)
2. Select `Run PowerShell Script as Admin`
3. Choose a PowerShell script to run
4. Approve the UAC prompt

## Requirements

- Windows with PowerShell installed
- VS Code 1.50+ (recommended)

## Author

Created by [thimpat](https://github.com/thimpat)