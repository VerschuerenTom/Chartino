import { LineChart } from "./linechart.mjs";
export declare class ChartStructure {
    private svg;
    private _chartGroup;
    private _horizontalAxisGroup;
    private _verticalAxisGroup;
    private _linesGroup;
    private _brushGroup;
    private _brush;
    private _zoomBrushGroup;
    private _zoomBrush;
    private _chart;
    constructor(svg: any, baseChart: LineChart);
    get chart(): LineChart;
    set chart(value: LineChart);
    get chartGroup(): any;
    set chartGroup(value: any);
    get horizontalAxisGroup(): any;
    set horizontalAxisGroup(value: any);
    get verticalAxisGroup(): any;
    set verticalAxisGroup(value: any);
    get linesGroup(): any;
    set linesGroup(value: any);
    get brushGroup(): any;
    set brushGroup(value: any);
    get brush(): any;
    set brush(value: any);
    set zoomBrush(value: any);
    get zoomBrush(): any;
    get zoomBrushGroup(): any;
    set zoomBrushGroup(value: any);
    getSvg(): any;
}
//# sourceMappingURL=chart-structure.d.ts.map