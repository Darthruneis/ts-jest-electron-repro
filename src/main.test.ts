import Main from "./main";
import { app, BrowserWindow } from "electron";

jest.mock("electron");

it("should handle all windows being closed", () => {
	//arrange

	//act
	Main.main(app, BrowserWindow);

	//assert
	expect(app.on).toHaveBeenCalledWith<[string, ...unknown[]]>(
		"window-all-closed"
	);
});

it("should use correct path for html index file", () => {
	//arrange

	//act
	const result = Main.getIndexPagePath();

	//assert
	expect(result).toMatch(/file:\/\/.*index\.html/);
});
