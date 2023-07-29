export class ChartStructure {
    constructor(svg, baseChart) {
        this.svg = svg;
        this._chart = baseChart;
    }
    get chart() {
        return this._chart;
    }
    set chart(value) {
        this._chart = value;
    }
    get chartGroup() {
        return this._chartGroup;
    }
    set chartGroup(value) {
        this._chartGroup = value;
    }
    get horizontalAxisGroup() {
        return this._horizontalAxisGroup;
    }
    set horizontalAxisGroup(value) {
        this._horizontalAxisGroup = value;
    }
    get verticalAxisGroup() {
        return this._verticalAxisGroup;
    }
    set verticalAxisGroup(value) {
        this._verticalAxisGroup = value;
    }
    get linesGroup() {
        return this._linesGroup;
    }
    set linesGroup(value) {
        this._linesGroup = value;
    }
    get brushGroup() {
        return this._brushGroup;
    }
    set brushGroup(value) {
        this._brushGroup = value;
    }
    get brush() {
        return this._brush;
    }
    set brush(value) {
        this._brush = value;
    }
    getSvg() {
        return this.svg;
    }
}
