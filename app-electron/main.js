const { app, BrowserWindow } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

let mainWindow;
let nextProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  });

  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    if (nextProcess) nextProcess.kill();
    app.quit();
  });
}

app.whenReady().then(() => {
  nextProcess = spawn("npm", ["run", "start"], {
    cwd: path.join(__dirname, "../app-next"),
    shell: true
  });

  setTimeout(createWindow, 3000);
});
