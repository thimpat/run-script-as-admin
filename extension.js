// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const cp = require('child_process');
	const path = require('path');

	let disposable = vscode.commands.registerCommand('run-script-as-admin.runScript', async function () {
		const uri = await vscode.window.showOpenDialog({
			canSelectMany: false,
			filters: { 'PowerShell Scripts': ['ps1'] },
			openLabel: 'Run as Admin'
		});

		if (!uri || uri.length === 0) {
			vscode.window.showWarningMessage('No script selected.');
			return;
		}

		const scriptPath = uri[0].fsPath;

		// Use Start-Process with -Verb RunAs to elevate
		const command = `Start-Process powershell -ArgumentList '-ExecutionPolicy Bypass -File "${scriptPath}"' -Verb RunAs`;

		cp.exec(`powershell -Command "${command}"`, (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage(`Failed to run script: ${error.message}`);
			} else {
				vscode.window.showInformationMessage(`Script launched as admin: ${path.basename(scriptPath)}`);
			}
		});
	});

}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
