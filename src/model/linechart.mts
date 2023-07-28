import * as d3 from "d3";
import { drawLineChart } from "../controller/chart-controller.js";
import { BaseChart } from "./basechart.js";
import { ChartLine } from "./chart-line.mjs";
import { HorizontalAxis, defaultHorizontalAxis } from "./horizontal-axis.js";
import { VerticalAxis, defaultVerticalAxis } from "./vertical-axis.js";

export class LineChart extends BaseChart{

    private chartLines: ChartLine[] = []
    private _horizontalAxis: HorizontalAxis = defaultHorizontalAxis;
    private _verticalAxis: VerticalAxis = defaultVerticalAxis;

    private _timeDomain: Date[] | undefined;
    private _verticalDomain: number[] = [0,0];
    private _timeScale: any;
    private _verticalScale: any;

    constructor(id: string){
        super(id)
    }

    public addChartLine(chartLine: ChartLine){
        this.chartLines.push(chartLine)
        return this;
    }

    public getChartlines(): ChartLine[]{
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

    public get timeDomain(): Date[] | undefined {
        return this._timeDomain;
    }
    public set timeDomain(value: Date[] | undefined) {
        if(value === undefined) return;
        this._timeDomain = value;
        this.timeScale = d3.scaleTime()
            .domain(value)
            .range([this.horizontalAxis.offset.left, this.getClientWidth() - this.horizontalAxis.offset.right])
    }
    public get verticalDomain(): number[] {
        return this._verticalDomain;
    }
    public set verticalDomain(value: number[]) {
        this._verticalDomain = value;
        this.verticalScale = d3.scaleLinear()
            .domain(this._verticalDomain)
            .range([this.horizontalAxis.offset.top,this.getClientHeight() - this.horizontalAxis.offset.bottom])
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



    public draw(){
        drawLineChart(this)
    }

}
