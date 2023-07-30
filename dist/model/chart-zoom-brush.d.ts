import { DomainLinker } from "./domain-linker.js";
export declare class ChartZoomBrush {
    private _domainLinker;
    protected _isUserDisabled: boolean;
    constructor(domainLinker: DomainLinker);
    get domainLinker(): DomainLinker;
    set domainLinker(value: DomainLinker);
    get isUserDisabled(): boolean;
}
export declare class UserDisabledChartZoomBrush extends ChartZoomBrush {
    constructor(domainLinker: DomainLinker);
}
//# sourceMappingURL=chart-zoom-brush.d.ts.map