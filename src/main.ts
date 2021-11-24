import { app, BrowserWindow } from "electron";
import path = require("path");

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.loadFile(path.join(__dirname, "../index.html"));

	win.webContents.openDevTools();
};

app.whenReady().then(() => {
	createWindow();

	app.on("window-all-closed", () => {
		if (process.platform !== "darwin") {
			app.quit();
		}
	});

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

export default class Main {
	static mainWindow: Electron.BrowserWindow;
	static application: Electron.App;

	private static onWindowAllClosed() {
		if (process.platform !== "darwin") {
			Main.application.quit();
		}
	}

	private static onClose() {
		Main.mainWindow = null;
	}

	private static onReady() {
		Main.mainWindow = new BrowserWindow({ width: 800, height: 600 });
		Main.mainWindow.loadFile("index.html");
		Main.mainWindow.on("closed", Main.onClose);
	}

	static main(app: Electron.App) {
		// we pass the Electron.App object into this function
		// so this class has no dependencies. This
		// makes the code easier to write tests for
		Main.application = app;
		Main.application.on("window-all-closed", Main.onWindowAllClosed);
		Main.application.on("ready", Main.onReady);
	}
}
