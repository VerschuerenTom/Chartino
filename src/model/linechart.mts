import * as d3 from "d3";
import { drawLineChart } from "../controller/chart-controller.js";
import { BaseChart } from "./basechart.js";
import { ChartLine } from "./chart-line.mjs";
import { HorizontalAxis, defaultHorizontalAxis } from "./horizontal-axis.js";
import { VerticalAxis, defaultVerticalAxis } from "./vertical-axis.js";
import { Tooltip } from "./tooltip.js";
import { ChartBrush } from "./chart-brush.js";
import { ChartZoomBrush } from "./chart-zoom-brush.js";

type Offsets = { top: number; bottom: number; right: number; left: number };

export class LineChart extends BaseChart {
    private chartLines: ChartLine[] = [];
    private _horizontalAxis: HorizontalAxis = defaultHorizontalAxis;
    private _verticalAxis: VerticalAxis = defaultVerticalAxis;
    public offsets: Offsets = { top: 50, bottom: 50, left: 50, right: 50 };

    private _timeDomain: number[] | undefined;
    private _verticalDomain: number[] = [0, 0];
    private _timeScale: any;
    private _verticalScale: any;

    private _timestamps: number[] = [];

    private _tooltip: Tooltip | undefined;
    private _brush: ChartBrush | undefined;
    private _zoomBrush: ChartZoomBrush | undefined;

    constructor(id: string) {
        super(id);
    }

    public addChartLine(chartLine: ChartLine): LineChart {
        this.chartLines.push(chartLine);
        this._timestamps = this._timestamps.concat(chartLine.timestamps);
        return this;
    }

    public setTooltip(tooltip: Tooltip): LineChart {
        this._tooltip = tooltip;
        return this;
    }

    public setBrush(brush: ChartBrush): LineChart {
        this._brush = brush;
        return this;
    }

    public setZoom(zoomBrush: ChartZoomBrush): LineChart {
        this._zoomBrush = zoomBrush;
        return this;
    }

    public get tooltip(): Tooltip | undefined {
        return this._tooltip;
    }
    public set tooltip(value: Tooltip | undefined) {
        this._tooltip = value;
    }

    public getChartlines(): ChartLine[] {
        return this.chartLines;
    }

    public get horizontalAxis(): HorizontalAxis {
        return this._horizontalAxis;
    }

    public set horizontalAxis(value: HorizontalAxis) {
        this._horizontalAxis = value;
    }

    public get verticalAxis(): VerticalAxis {
        return this._verticalAxis;
    }

    public set verticalAxis(value: VerticalAxis) {
        this._verticalAxis = value;
    }

    public get timeDomain(): number[] | undefined {
        return this._timeDomain;
    }

    public set timeDomain(value: number[] | undefined) {
        if (value === undefined) return;
        this._timeDomain = value;
        this.timeScale = d3
            .scaleTime()
            .domain(value)
            .range([this.offsets.left, this.getClientWidth() - this.offsets.right]);
    }

    public get verticalDomain(): number[] {
        return this._verticalDomain;
    }

    public set verticalDomain(value: number[]) {
        this._verticalDomain = value;
        this.verticalScale = d3
            .scaleLinear()
            .domain(this._verticalDomain)
            .range([this.offsets.top, this.getClientHeight() - this.offsets.bottom]);
    }

    public get timeScale(): any {
        return this._timeScale;
    }

    public set timeScale(value: any) {
        this._timeScale = value;
    }

    public get verticalScale(): any {
        return this._verticalScale;
    }

    public set verticalScale(value: any) {
        this._verticalScale = value;
    }

    public get timestamps(): number[] {
        return this._timestamps;
    }

    public get brush(): ChartBrush | undefined {
        return this._brush;
    }
    public set brush(value: ChartBrush | undefined) {
        this._brush = value;
    }

    public get zoomBrush(): ChartZoomBrush | undefined {
        return this._zoomBrush;
    }
    public set zoomBrush(value: ChartZoomBrush | undefined) {
        this._zoomBrush = value;
    }

    public draw() {
        drawLineChart(this);
    }
}
