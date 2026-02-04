import { app, BrowserWindow, ipcMain} from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow ({
    width: 500,
    height: 600,
  });

  app.isPackaged
    ? mainWindow.loadFile(path.join(__dirname, "index.html")) // Prod
    : (mainWindow.loadURL("http://localhost:5173"), // Dev
      mainWindow.webContents.openDevTools()); // Open dev tools
});

// Listen for close app from renderer
ipcMain.on("close-app", () => {
  app.quit();
});

app.on("window-all-closed", () => {
  app.quit();
});

// npm install --save-dev concurrently wait-on