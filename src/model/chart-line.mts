import * as d3 from "d3";
import { Color } from "./color.js";



export class ChartLine{

    private _data: {[key:number]: number};
    private color: Color = "#000000"
    private _timeDomain: Date[];

    private _verticalDomain: number[] = [0, 0];

    constructor(data: {[key:number]: number}){
            this._data = data;
            const test = Object.keys(this._data).map(number => new Date(parseInt(number)))
            console.log(test)
            this._timeDomain  = d3.extent(test) as Date[]
            console.log(this._timeDomain)
            this._verticalDomain = d3.extent(Object.values(this._data)).map(number => number) as number[]
    }

    public setColor(color: Color){
        this.color = color;
    }

    public get data(): {[key:number]: number} {
        return this._data;
    }
    public set data(value: {[key:number]: number}) {
        this._data = value;
    }

    public get timeDomain(): Date[] | undefined {
        return this._timeDomain;
    }

    public get verticalDomain(): number[] {
        return this._verticalDomain;
    }

}