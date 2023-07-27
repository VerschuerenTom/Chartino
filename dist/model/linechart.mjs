import { drawLineChart } from "../controller/chart-controller.js";
import { BaseChart } from "./basechart.js";
import { defaultHorizontalAxis } from "./horizontal-axis.js";
import { defaultVerticalAxis } from "./vertical-axis.js";
export class LineChart extends BaseChart {
    constructor(id) {
        super(id);
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
