// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as os from 'os';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "8086-final-version" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('8086-final-version.helloWorld', () => {
		const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const filePath = document.fileName;
      const extensionPath = context.extensionPath;
      const platform = os.platform();

      // Yeni bir terminal oluşturun
      const terminal = vscode.window.createTerminal('8086 Emulator');
      terminal.show(true);

      if (platform === 'darwin') {
        terminal.sendText(`${extensionPath}/bin/emulator_8086_macos "${filePath}" -i`);
    }
      else if (platform === 'linux') {
        terminal.sendText(`chmod u+x ${extensionPath}/bin/emulator_8086_linux`);
        terminal.sendText(`${extensionPath}/bin/emulator_8086_linux "${filePath}" -i`);
    } else if (platform === 'win32') {
        terminal.sendText(`${extensionPath}\\bin\\emulator_8086.exe "${filePath}" -i`);
    }
      // Terminal üzerinden emülatörü filePath ile birlikte çalıştırın
      
    } else {
      vscode.window.showErrorMessage("No active editor!");
    }
});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
