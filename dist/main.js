"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
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
        Main.mainWindow.loadFile(Main.getIndexPagePath());
        Main.mainWindow.on("closed", Main.onClose);
    };
    Main.getIndexPagePath = function () {
        return "file://" + path.join(__dirname, "../index.html");
    };
    Main.main = function (app, ctor) {
        Main.windowConstructor = ctor;
        Main.application = app;
        Main.application.on("window-all-closed", Main.onWindowAllClosed);
        Main.application.on("ready", Main.onReady);
    };
    return Main;
}());
exports.default = Main;
//# sourceMappingURL=Main.js.map