import { LineChart } from "./linechart.mjs";

export class ChartStructure{

    private svg: any;

    private _chartGroup: any;
    private _horizontalAxisGroup: any;
    private _verticalAxisGroup: any;
    private _linesGroup: any;
    private _brushGroup: any;
    private _brush: any;
    private _zoomBrushGroup: any;
    private _zoomBrush: any;

    private _chart: LineChart;

    constructor(svg: any, baseChart: LineChart){
        this.svg = svg;
        this._chart = baseChart;
    }

    public get chart(): LineChart {
        return this._chart;
    }
    
    public set chart(value: LineChart) {
        this._chart = value;
    }

    public get chartGroup(): any {
        return this._chartGroup;
    }

    public set chartGroup(value: any) {
        this._chartGroup = value;
    }

    public get horizontalAxisGroup(): any {
        return this._horizontalAxisGroup;
    }

    public set horizontalAxisGroup(value: any) {
        this._horizontalAxisGroup = value;
    }

    public get verticalAxisGroup(): any {
        return this._verticalAxisGroup;
    }

    public set verticalAxisGroup(value: any) {
        this._verticalAxisGroup = value;
    }

    public get linesGroup(): any {
        return this._linesGroup;
    }

    public set linesGroup(value: any) {
        this._linesGroup = value;
    }

    public get brushGroup(): any {
        return this._brushGroup;
    }

    public set brushGroup(value: any) {
        this._brushGroup = value;
    }

    public get brush(): any {
        return this._brush;
    }
    
    public set brush(value: any) {
        this._brush = value;
    }

    public set zoomBrush(value: any) {
        this._zoomBrush = value;
    }
    
    public get zoomBrush(): any {
        return this._zoomBrush;
    }

    public get zoomBrushGroup(): any {
        return this._zoomBrushGroup;
    }

    public set zoomBrushGroup(value: any) {
        this._zoomBrushGroup = value;
    }
    
    public getSvg(){
        return this.svg;
    }
}