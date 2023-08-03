export class Tooltip {
    constructor(callback) {
        this._positionCallback = (x, y) => ({
            x: x + 10,
            y: y + 10,
        });
        this._callback = callback;
    }
    get callback() {
        return this._callback;
    }
    get positionCallback() {
        return this._positionCallback;
    }
    set positionCallback(value) {
        this._positionCallback = value;
    }
}
