import { BaseChart } from "./basechart.js";
import { ChartLine } from "./chart-line.mjs";
export declare class LineChart extends BaseChart {
    private chartLines;
    private horizontalAxis;
    private verticalAxis;
    constructor(id: string);
    addChartLine(chartLine: ChartLine): this;
    draw(): void;
}
//# sourceMappingURL=linechart.d.mts.map