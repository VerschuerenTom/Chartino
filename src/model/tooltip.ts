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
export class Tooltip {
    private _callback: (
        svg: d3.Selection<SVGElement, object, HTMLElement, any>,
        pointData: TooltipData,
        dimensions: Dimensions
    ) => void;
    private _positionCallback: (x: number, y: number) => { x: number; y: number } = (x, y) => ({
        x: x + 10,
        y: y + 10,
    });

    constructor(
        callback: (
            svg: d3.Selection<SVGElement, object, HTMLElement, any>,
            pointData: TooltipData,
            dimensions: Dimensions
        ) => void
    ) {
        this._callback = callback;
    }

    public get callback(): (
        svg: d3.Selection<SVGElement, object, HTMLElement, any>,
        pointData: TooltipData,
        dimensions: Dimensions
    ) => void {
        return this._callback;
    }

    public get positionCallback(): (x: number, y: number) => { x: number; y: number } {
        return this._positionCallback;
    }
    public set positionCallback(value: (x: number, y: number) => { x: number; y: number }) {
        this._positionCallback = value;
    }
}
