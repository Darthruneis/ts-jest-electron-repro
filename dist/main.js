"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var createWindow = function () {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });
    win.loadFile(path.join(__dirname, "../index.html"));
    win.webContents.openDevTools();
};
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on("window-all-closed", function () {
        if (process.platform !== "darwin") {
            electron_1.app.quit();
        }
    });
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
var Main = (function () {
    function Main() {
    }
    Main.onWindowAllClosed = function () {
        if (process.platform !== "darwin") {
            Main.application.quit();
        }
    };
    Main.onClose = function () {
        Main.mainWindow = null;
    };
    Main.onReady = function () {
        Main.mainWindow = new electron_1.BrowserWindow({ width: 800, height: 600 });
        Main.mainWindow.loadFile("index.html");
        Main.mainWindow.on("closed", Main.onClose);
    };
    Main.main = function (app) {
        Main.application = app;
        Main.application.on("window-all-closed", Main.onWindowAllClosed);
        Main.application.on("ready", Main.onReady);
    };
    return Main;
}());
exports.default = Main;
//# sourceMappingURL=Main.js.map