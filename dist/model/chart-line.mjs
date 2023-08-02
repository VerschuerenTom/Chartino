import * as d3 from "d3";
export class ChartLine {
    constructor(timestamps, data) {
        this._color = "#000000";
        this._isAutoScale = false;
        this._lineData = [];
        this._verticalDomain = [0, 0];
        if (timestamps.length !== data.length) {
            throw Error("Timestamp array and data array should be of the same length!");
        }
        this._data = data;
        this._timestamps = timestamps;
        this._timeDomain = d3.extent(timestamps);
        this._verticalDomain = d3.extent(data).map((number) => number);
        this._lineData = timestamps.map((timestamp, index) => {
            return [new Date(timestamp), data[index]];
        });
    }
    setAutoScale(isAutoScale) {
        this.isAutoScale = isAutoScale;
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
    get timestamps() {
        return this._timestamps;
    }
    getValue(timestamp) {
        const index = this._timestamps.findIndex((element) => element == timestamp);
        return this._data[index]; //TODO: what if timestamp is not in array
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get isAutoScale() {
        return this._isAutoScale;
    }
    set isAutoScale(value) {
        this._isAutoScale = value;
    }
    get lineData() {
        return this._lineData;
    }
    set lineData(value) {
        this._lineData = value;
    }
}
