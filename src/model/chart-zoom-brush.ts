import { DomainLinker } from "./domain-linker.js";

export class ChartZoomBrush {
    private _domainLinker: DomainLinker;
    protected _isUserDisabled: boolean = false;

    constructor(domainLinker: DomainLinker) {
        this._domainLinker = domainLinker;
    }

    public get domainLinker(): DomainLinker {
        return this._domainLinker;
    }
    public set domainLinker(value: DomainLinker) {
        this._domainLinker = value;
    }

    public get isUserDisabled(): boolean {
        return this._isUserDisabled;
    }
}

export class UserDisabledChartZoomBrush extends ChartZoomBrush {
    constructor(domainLinker: DomainLinker) {
        super(domainLinker);
        this._isUserDisabled = true;
    }
}
