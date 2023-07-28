import { BaseChart } from "./basechart.js";
import { ChartLine } from "./chart-line.mjs";
import { HorizontalAxis } from "./horizontal-axis.js";
import { VerticalAxis } from "./vertical-axis.js";
export declare class LineChart extends BaseChart {
    private chartLines;
    private _horizontalAxis;
    private _verticalAxis;
    private _timeDomain;
    private _verticalDomain;
    private _timeScale;
    private _verticalScale;
    constructor(id: string);
    addChartLine(chartLine: ChartLine): this;
    getChartlines(): ChartLine[];
    get horizontalAxis(): HorizontalAxis;
    set horizontalAxis(value: HorizontalAxis);
    get verticalAxis(): VerticalAxis;
    set verticalAxis(value: VerticalAxis);
    get timeDomain(): Date[] | undefined;
    set timeDomain(value: Date[] | undefined);
    get verticalDomain(): number[];
    set verticalDomain(value: number[]);
    get timeScale(): any;
    set timeScale(value: any);
    get verticalScale(): any;
    set verticalScale(value: any);
    draw(): void;
}
//# sourceMappingURL=linechart.d.mts.map