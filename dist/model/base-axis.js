export class BaseAxis {
    constructor() {
        this._isEnabled = true;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(value) {
        this._isEnabled = value;
    }
}
