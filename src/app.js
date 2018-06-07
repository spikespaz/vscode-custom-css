let vscode = require("vscode");
let fs = require("fs");
let path = require("path");
let events = require("events");

const messages = {
    needsAdmin: "VS Code needs to be started with Administrator permissions to enable Smooth Typing.",
    enabled: "Smooth Typing has been enabled. Please restart the window.",
    disabled: "Smooth Typing has been disabled. Please restart the window.",
    reloaded: "Smooth Typing has been enabled. Please restart the window.",
    alreadyEnabled: "Smooth Typing is already enabled.",
    enableFailed: "Enabling Smooth Typing failed. Check the debug console for details."
};

const appDirectory = path.dirname(require.main.filename);
const indexPath = appDirectory + "/vs/workbench/electron-browser/bootstrap/index.html";
const injectionPattern = /\s*<!-- \[Begin SmoothType] -->(?:.|\s)+<!-- \[End SmoothType] -->/;
const injectionTemplate = [
    "\n$1\t<!-- [Begin SmoothType] -->$1\t<style>",
    "</style>$1\t<!-- [End SmoothType] -->$1</head>"
];

function enableAnimation() {}
function disableAnimation() { }
function reloadAnimation() { }


function activate(context) {
    context.subscriptions.push(vscode.commands.registerCommand("extension.enableAnimation", enableAnimation));
    context.subscriptions.push(vscode.commands.registerCommand("extension.disableAnimation", disableAnimation));
    context.subscriptions.push(vscode.commands.registerCommand("extension.reloadAnimation", reloadAnimation));
}


function deactivate() {
    vscode.commands.executeCommand("extension.disableAnimation");
}


exports.activate = activate;
exports.deactivate = deactivate;
