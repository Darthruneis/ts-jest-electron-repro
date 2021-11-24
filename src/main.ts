import { BrowserWindow } from "electron";
import path = require("path");

export default class Main {
	static mainWindow: Electron.BrowserWindow;
	static application: Electron.App;
	static windowConstructor: typeof Electron.BrowserWindow;

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
		Main.mainWindow.loadFile(Main.getIndexPagePath());
		Main.mainWindow.on("closed", Main.onClose);
	}

	static getIndexPagePath() {
		return "file://" + path.join(__dirname, "../index.html");
	}

	static main(app: Electron.App, ctor: typeof Main.windowConstructor) {
		// we pass the Electron.App object into this function
		// so this class has no dependencies. This
		// makes the code easier to write tests for
		Main.windowConstructor = ctor;
		Main.application = app;
		Main.application.on("window-all-closed", Main.onWindowAllClosed);
		Main.application.on("ready", Main.onReady);
	}
}
