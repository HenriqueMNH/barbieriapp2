const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  });

  // Load the static index.html from the Next.js export
  const indexPath = path.join(__dirname, "../out/index.html");
  mainWindow.loadFile(indexPath);

  mainWindow.on("closed", () => {
    app.quit();
  });
}

app.whenReady().then(createWindow);
