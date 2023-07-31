import { Color } from "./color.js";
type LineData = {
    [key: number]: number;
};
export declare class ChartLine {
    private _data;
    private _timestamps;
    private _dataEntries;
    private _color;
    private _timeDomain;
    private _isAutoScale;
    private _verticalDomain;
    constructor(data: LineData);
    setAutoScale(isAutoScale: boolean): void;
    setColor(color: Color): void;
    get data(): LineData;
    set data(value: LineData);
    get timeDomain(): Date[];
    get verticalDomain(): number[];
    get timestamps(): Date[];
    getValue(timestamp: Date): number;
    get dataEntries(): [string, number][];
    get color(): Color;
    set color(value: Color);
    get isAutoScale(): boolean;
    set isAutoScale(value: boolean);
}
export {};
//# sourceMappingURL=chart-line.d.mts.map