type Margin = {
    top: number;
    bottom: number;
    right: number;
    left: number;
};
export declare class BaseAxis {
    offset: Margin;
    private _isEnabled;
    constructor();
    setOffset(offset: Margin): void;
    getOffset(): Margin;
    get isEnabled(): boolean;
    set isEnabled(value: boolean);
}
export {};
//# sourceMappingURL=base-axis.d.ts.map