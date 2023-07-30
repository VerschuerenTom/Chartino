export class ChartZoomBrush {
    constructor(domainLinker) {
        this._isUserDisabled = false;
        this._domainLinker = domainLinker;
    }
    get domainLinker() {
        return this._domainLinker;
    }
    set domainLinker(value) {
        this._domainLinker = value;
    }
    get isUserDisabled() {
        return this._isUserDisabled;
    }
}
export class UserDisabledChartZoomBrush extends ChartZoomBrush {
    constructor(domainLinker) {
        super(domainLinker);
        this._isUserDisabled = true;
    }
}
