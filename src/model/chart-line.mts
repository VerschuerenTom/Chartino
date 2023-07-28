import * as d3 from "d3";
import { Color } from "./color.js";

type LineData = {[key:number]: number} //allow any for invalid data...then filter it out

export class ChartLine{

    private _data: LineData;
    private _timestamps: Date[];
    private _dataEntries;
    private _color: Color = "#000000";
    private _timeDomain: Date[];

    private _verticalDomain: number[] = [0, 0];

    constructor(data: LineData){
            this._data = data;
            this._timestamps = Object.keys(this._data).map(number => new Date(parseInt(number)))
            this._timeDomain  = d3.extent(this.timestamps) as Date[]
            this._dataEntries = Object.entries(this._data)
            this._verticalDomain = d3.extent(Object.values(this._data)).map(number => number) as number[]
    }

    public get data(): LineData {
        return this._data;
    }
    public set data(value: LineData) {
        this._data = value;
    }

    public get timeDomain(): Date[] | undefined {
        return this._timeDomain;
    }

    public get verticalDomain(): number[] {
        return this._verticalDomain;
    }

    public get timestamps(): Date[]{
        return this._timestamps
    }

    public get dataEntries(){
        return this._dataEntries;
    }

    public get color(): Color {
        return this._color;
    }
    public set color(value: Color) {
        this._color = value;
    }

}