import { app, BrowserWindow, ipcMain, protocol, session, Menu} from "electron";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import fs from "fs";

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
  } 
  else if (process.argv.includes("--prod")) {
    console.log(
      "Production path:",
      path.join(__dirname, "../build/client/index.html")
    );    mainWindow.loadFile(
        path.join(__dirname, "../build/client/index.html")
    );
  }
  else {
    // In dev open the Vite dev server and DevTools
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.webContents.openDevTools();
  }

  Menu.setApplicationMenu(null);

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

    if (relativePath.endsWith(".wav")) {
      const audio = await fs.promises.readFile(fullPath);

      return new Response(audio, {
        headers: {
          "Content-Type": "audio/wav",
          "Content-Length": String(audio.byteLength),
        },
      });
    }

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