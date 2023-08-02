export type TooltipData = {
    value: number;
    color: string;
}[];
export declare class MouseTooltip {
    private _callback;
    private _positionCallback;
    constructor(callback: (time: number, pointData: TooltipData) => string);
    get callback(): (time: number, pointData: TooltipData) => string;
    get positionCallback(): (x: number, y: number) => {
        x: number;
        y: number;
    };
    set positionCallback(value: (x: number, y: number) => {
        x: number;
        y: number;
    });
}
//# sourceMappingURL=mouse-tooltip.d.ts.map