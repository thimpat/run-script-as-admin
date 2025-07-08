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

	let disposable = vscode.commands.registerCommand('run-script-as-admin.runScript', function (uri) {
		if (!uri || !uri.fsPath) {
			vscode.window.showWarningMessage('No script selected.');
			return;
		}

		const scriptPath = uri.fsPath;
		const ext = path.extname(scriptPath).toLowerCase();

		let command;

		if (ext === '.ps1') {
			command = `Start-Process pwsh -ArgumentList '-ExecutionPolicy Bypass -File "${scriptPath}"' -Verb RunAs`;
		} else if (ext === '.bat' || ext === '.cmd') {
			command = `Start-Process cmd -ArgumentList '/c "${scriptPath}"' -Verb RunAs`;
		} else {
			vscode.window.showErrorMessage(`Unsupported file type: ${ext}`);
			return;
		}

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
