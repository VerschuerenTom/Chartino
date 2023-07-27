import { drawLineChart } from "../controller/chart-controller";
import { BaseChart } from "./basechart";
import { defaultHorizontalAxis } from "./horizontal-axis";
import { defaultVerticalAxis } from "./vertical-axis";
export class LineChart extends BaseChart {
    constructor(id, chartRef) {
        super(id, chartRef);
        this.chartLines = [];
        this.horizontalAxis = defaultHorizontalAxis;
        this.verticalAxis = defaultVerticalAxis;
    }
    addChartLine(chartLine) {
        this.chartLines.push(chartLine);
        return this;
    }
    draw() {
        drawLineChart(this);
    }
}
