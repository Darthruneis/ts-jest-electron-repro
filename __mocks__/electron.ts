export const on_Application = jest.fn();
export const on_BrowserWindow = jest.fn();
export const handle_BrowserWindow = jest.fn();
export const loadFile = jest.fn();

const BrowserWindow = jest.fn(() => {
	return {
		on: jest.fn(),
		loadFile: jest.fn(),
	};
});

export default jest.fn(() => {
	return {
		on: jest.fn(),
		BrowserWindow: jest.fn(() => {
			return {
				on: jest.fn(),
				loadFile: jest.fn(),
			};
		}),
	};
});
