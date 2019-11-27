const vscode = require('vscode');
const fs = require("fs"); 

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let time = {
		start: 0, 
		end: 0
	} 

	let saveTimeFileTo = "/tmp/toad/time"; 

	let timeFileLocation = vscode.commands.registerCommand('extension.timeFileLocation', async function() {
		saveTimeFileTo = await vscode.window.showInputBox();
		vscode.window.showInformationMessage(`Your time file will be saved: ${saveTimeFileTo}/time`); 
	}); 

	let startTime = vscode.commands.registerCommand('extension.startTime', function () {
		const now = new Date(); 
		time.start = now;  
		vscode.window.showInformationMessage(now); 
	}); 

	let endTime = vscode.commands.registerCommand('extension.endTime', function() {
		const now = new Date();
		time.end = now; 
		vscode.window.showInformationMessage(time.start); 
		vscode.window.showInformationMessage(time.end); 
		fs.mkdir(saveTimeFileTo, err => { 
			if (err && err.code != 'EEXIST') vscode.showInformationMessage("Error"); 
			fs.writeFile(`${saveTimeFileTo}/time`, JSON.stringify(time), function(err) {
				if(err) {
					return console.log(err);
				}
				vscode.window.showInformationMessage(`Your time file was saved: ${saveFileTo}`); 
			}); 
		})
	}); 

	context.subscriptions.push(startTime);
	context.subscriptions.push(endTime); 
	context.subscriptions.push(timeFileLocation); 
} 

exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
