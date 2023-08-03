import * as d3 from "d3";
import { Color } from "./color.js";

export class ChartLine {
    private _data: number[];
    private _timestamps: number[];
    private _color: Color = "#000000";
    private _timeDomain: number[];
    private _isAutoScale: boolean = false;
    private _verticalScale: any;
    private _lineData: [Date, number][] = [];

    private _verticalDomain: number[] = [0, 0];

    constructor(timestamps: number[], data: number[]) {
        if (timestamps.length !== data.length) {
            throw Error("Timestamp array and data array should be of the same length!");
        }
        this._data = data;
        this._timestamps = timestamps;
        this._timeDomain = d3.extent(timestamps) as number[];
        this._verticalDomain = d3.extent(data).map((number) => number) as number[];
        this._lineData = timestamps.map((timestamp, index) => {
            return [new Date(timestamp), data[index]];
        });
    }

    public setAutoScale(isAutoScale: boolean) {
        this.isAutoScale = isAutoScale;
    }

    public setColor(color: Color) {
        this.color = color;
    }

    public get data(): number[] {
        return this._data;
    }
    public set data(value: number[]) {
        this._data = value;
    }

    public get timeDomain(): number[] {
        return this._timeDomain;
    }

    public get verticalDomain(): number[] {
        return this._verticalDomain;
    }

    public get timestamps(): number[] {
        return this._timestamps;
    }

    public getValue(timestamp: number): number {
        const index = this._timestamps.findIndex((element) => element == timestamp);
        return this._data[index]; //TODO: what if timestamp is not in array
    }

    public get color(): Color {
        return this._color;
    }

    public set color(value: Color) {
        this._color = value;
    }

    public get isAutoScale(): boolean {
        return this._isAutoScale;
    }

    public set isAutoScale(value: boolean) {
        this._isAutoScale = value;
    }

    public get lineData(): [Date, number][] {
        return this._lineData;
    }
    public set lineData(value: [Date, number][]) {
        this._lineData = value;
    }

    public get verticalScale() {
        return this._verticalScale;
    }
    public set verticalScale(value) {
        this._verticalScale = value;
    }
}
