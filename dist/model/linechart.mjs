import * as d3 from "d3";
import { drawLineChart } from "../controller/chart-controller.js";
import { BaseChart } from "./basechart.js";
import { defaultHorizontalAxis } from "./horizontal-axis.js";
import { defaultVerticalAxis } from "./vertical-axis.js";
export class LineChart extends BaseChart {
    constructor(id) {
        super(id);
        this.chartLines = [];
        this._horizontalAxis = defaultHorizontalAxis;
        this._verticalAxis = defaultVerticalAxis;
        this._verticalDomain = [0, 0];
        this._timestamps = [];
    }
    addChartLine(chartLine) {
        this.chartLines.push(chartLine);
        this._timestamps = this._timestamps.concat(chartLine.timestamps);
        return this;
    }
    setTooltip(tooltip) {
        this._tooltip = tooltip;
    }
    get tooltip() {
        return this._tooltip;
    }
    set tooltip(value) {
        this._tooltip = value;
    }
    getChartlines() {
        return this.chartLines;
    }
    get horizontalAxis() {
        return this._horizontalAxis;
    }
    set horizontalAxis(value) {
        this._horizontalAxis = value;
    }
    get verticalAxis() {
        return this._verticalAxis;
    }
    set verticalAxis(value) {
        this._verticalAxis = value;
    }
    get timeDomain() {
        return this._timeDomain;
    }
    set timeDomain(value) {
        if (value === undefined)
            return;
        this._timeDomain = value;
        this.timeScale = d3.scaleTime()
            .domain(value)
            .range([this.horizontalAxis.offset.left, this.getClientWidth() - this.horizontalAxis.offset.right]);
    }
    get verticalDomain() {
        return this._verticalDomain;
    }
    set verticalDomain(value) {
        this._verticalDomain = value;
        this.verticalScale = d3.scaleLinear()
            .domain(this._verticalDomain)
            .range([this.horizontalAxis.offset.top, this.getClientHeight() - this.horizontalAxis.offset.bottom]);
    }
    get timeScale() {
        return this._timeScale;
    }
    set timeScale(value) {
        this._timeScale = value;
    }
    get verticalScale() {
        return this._verticalScale;
    }
    set verticalScale(value) {
        this._verticalScale = value;
    }
    get timestamps() {
        return this._timestamps;
    }
    draw() {
        drawLineChart(this);
    }
}
