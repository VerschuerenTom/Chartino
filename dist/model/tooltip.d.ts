export declare class Tooltip {
    private _callback;
    constructor(callback: (time: Date, pointData: {
        value: number;
        color: string;
    }[]) => string);
    get callback(): (time: Date, pointData: {
        value: number;
        color: string;
    }[]) => string;
}
//# sourceMappingURL=tooltip.d.ts.map