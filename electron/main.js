import { app, BrowserWindow, ipcMain, protocol, session} from "electron";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

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
    webPreferences: {
    partition: "persist:main",
    preload: path.join(__dirname, 'preload.cjs'),
    sandbox: false,

    },
  });

  mainWindow.webContents.on(
  "did-fail-load",
  (event, errorCode, errorDescription, validatedURL) => {
    console.error("Page failed to load:");
    console.error(errorCode);
    console.error(errorDescription);
    console.error(validatedURL);
  }
);

  

  if (app.isPackaged) {
    mainWindow.loadURL("app://localhost/");
  } else {
    // In dev open the Vite dev server and DevTools
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}


protocol.registerSchemesAsPrivileged([
  {
    scheme: "app",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true,
    },
  },
]);

app.whenReady().then(() => {
  const ses = session.fromPartition("persist:main");

  ses.protocol.handle("app", async (request) => {
    const url = new URL(request.url);

    const relativePath =
      url.pathname === "/"
        ? "index.html"
        : url.pathname.slice(1);

    const fullPath = path.join(
      process.resourcesPath,
      "build",
      "client",
      relativePath
    );

    return ses.fetch(pathToFileURL(fullPath).toString());
  });

  createMainWindow();
});

// Listen for close app from renderer
ipcMain.on("close-app", () => {
  app.quit();
});

app.on("window-all-closed", () => {
  app.quit();
});

// npm install --save-dev concurrently wait-on