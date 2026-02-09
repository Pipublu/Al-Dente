import { app, BrowserWindow, ipcMain} from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

function createMainWindow() {
  let window_width = 500;
  let window_height = 600;

  if (!app.isPackaged) {
    // In dev, allocate more width for DevTools
    window_width = 800;
  }

  mainWindow = new BrowserWindow({
    width: window_width,
    height: window_height,
  });

  if (app.isPackaged) {
    // If production
    mainWindow.loadFile(path.join(__dirname, "index.html"));
  } else {
    // In dev open the Vite dev server and DevTools
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createMainWindow);

// Listen for close app from renderer
ipcMain.on("close-app", () => {
  app.quit();
});

app.on("window-all-closed", () => {
  app.quit();
});

// npm install --save-dev concurrently wait-on