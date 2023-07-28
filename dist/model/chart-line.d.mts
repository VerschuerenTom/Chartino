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
    private _verticalDomain;
    constructor(data: LineData);
    get data(): LineData;
    set data(value: LineData);
    get timeDomain(): Date[] | undefined;
    get verticalDomain(): number[];
    get timestamps(): Date[];
    get dataEntries(): [string, number][];
    get color(): Color;
    set color(value: Color);
}
export {};
//# sourceMappingURL=chart-line.d.mts.map