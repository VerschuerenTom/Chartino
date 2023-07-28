import { BaseChart } from "./basechart.js";
export declare class ChartStructure {
    private timeScale;
    private svg;
    private _chartGroup;
    private _horizontalAxisGroup;
    private _verticalAxisGroup;
    private _chart;
    constructor(svg: any, baseChart: BaseChart);
    get chart(): BaseChart;
    set chart(value: BaseChart);
    get chartGroup(): any;
    set chartGroup(value: any);
    get horizontalAxisGroup(): any;
    set horizontalAxisGroup(value: any);
    get verticalAxisGroup(): any;
    set verticalAxisGroup(value: any);
    getSvg(): any;
}
//# sourceMappingURL=chart-structure.d.ts.map