export class Tooltip {
    constructor(callback) {
        this._callback = callback;
    }
    get callback() {
        return this._callback;
    }
}
