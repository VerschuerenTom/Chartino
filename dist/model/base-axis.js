export class BaseAxis {
    constructor() {
        this.offset = { top: 50, bottom: 50, left: 50, right: 50 };
        this._isEnabled = true;
    }
    setOffset(offset) {
        this.offset = offset;
    }
    getOffset() {
        return this.offset;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(value) {
        this._isEnabled = value;
    }
}
