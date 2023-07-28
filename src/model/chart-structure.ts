import { BaseChart } from "./basechart.js";

export class ChartStructure{

    private timeScale: any;

    private svg: any;

    private _chartGroup: any;
    private _horizontalAxisGroup: any;
    private _verticalAxisGroup: any;

    private _chart: BaseChart;


    constructor(svg: any, baseChart: BaseChart){
        this.svg = svg;
        this._chart = baseChart;
    }

    public get chart(): BaseChart {
        return this._chart;
    }
    public set chart(value: BaseChart) {
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
    

    public getSvg(){
        return this.svg;
    }
}