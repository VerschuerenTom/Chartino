import * as d3 from "d3";
export class ChartLine {
    constructor(data) {
        this.color = "#000000";
        this._verticalDomain = [0, 0];
        this._data = data;
        const test = Object.keys(this._data).map(number => new Date(parseInt(number)));
        console.log(test);
        this._timeDomain = d3.extent(test);
        console.log(this._timeDomain);
        this._verticalDomain = d3.extent(Object.values(this._data)).map(number => number);
    }
    setColor(color) {
        this.color = color;
    }
    get data() {
        return this._data;
    }
    set data(value) {
        this._data = value;
    }
    get timeDomain() {
        return this._timeDomain;
    }
    get verticalDomain() {
        return this._verticalDomain;
    }
}
