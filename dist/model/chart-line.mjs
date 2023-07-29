import * as d3 from "d3";
export class ChartLine {
    constructor(data) {
        this._color = "#000000";
        this._verticalDomain = [0, 0];
        this._data = data;
        this._timestamps = Object.keys(this._data).map(number => new Date(parseInt(number)));
        this._timeDomain = d3.extent(this.timestamps);
        this._dataEntries = Object.entries(this._data);
        this._verticalDomain = d3.extent(Object.values(this._data)).map(number => number);
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
    get timestamps() {
        return this._timestamps;
    }
    getValue(timestamp) {
        return this._data[timestamp.getTime()]; //TODO: what if timestamp is not in array
    }
    get dataEntries() {
        return this._dataEntries;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
}
