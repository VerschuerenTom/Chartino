import { Color } from "./color.js";
export declare class ChartLine {
    private _data;
    private _timestamps;
    private _color;
    private _timeDomain;
    private _isAutoScale;
    private _verticalScale;
    private _lineData;
    private _verticalDomain;
    constructor(timestamps: number[], data: number[]);
    setAutoScale(isAutoScale: boolean): void;
    setColor(color: Color): void;
    get data(): number[];
    set data(value: number[]);
    get timeDomain(): number[];
    get verticalDomain(): number[];
    get timestamps(): number[];
    getValue(timestamp: number): number;
    get color(): Color;
    set color(value: Color);
    get isAutoScale(): boolean;
    set isAutoScale(value: boolean);
    get lineData(): [Date, number][];
    set lineData(value: [Date, number][]);
    get verticalScale(): any;
    set verticalScale(value: any);
}
//# sourceMappingURL=chart-line.d.mts.map