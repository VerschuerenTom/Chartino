import { BaseChart } from "./basechart";
import { ChartLine } from "./chart-line";
export declare class LineChart extends BaseChart {
    private chartLines;
    private horizontalAxis;
    private verticalAxis;
    constructor(id: string, chartRef: any);
    addChartLine(chartLine: ChartLine): this;
    draw(): void;
}
//# sourceMappingURL=linechart.d.ts.map