import { Color } from "./color.js";
export type TooltipData = {
    pointX: any;
    pointY: any;
    timestamp: number;
    value: number;
    color: Color;
}[];
export type Dimensions = {
    svgHeight: number;
    svgWidth: number;
    offset: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
};
export declare class Tooltip {
    private _callback;
    private _positionCallback;
    constructor(callback: (svg: d3.Selection<SVGElement, object, HTMLElement, any>, pointData: TooltipData, dimensions: Dimensions) => void);
    get callback(): (svg: d3.Selection<SVGElement, object, HTMLElement, any>, pointData: TooltipData, dimensions: Dimensions) => void;
    get positionCallback(): (x: number, y: number) => {
        x: number;
        y: number;
    };
    set positionCallback(value: (x: number, y: number) => {
        x: number;
        y: number;
    });
}
//# sourceMappingURL=tooltip.d.ts.map