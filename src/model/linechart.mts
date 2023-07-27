import { drawLineChart } from "../controller/chart-controller.js";
import { BaseChart } from "./basechart.js";
import { ChartLine } from "./chart-line.mjs";
import { HorizontalAxis, defaultHorizontalAxis } from "./horizontal-axis.js";
import { VerticalAxis, defaultVerticalAxis } from "./vertical-axis.js";

export class LineChart extends BaseChart{

    private chartLines: ChartLine[] = []
    private horizontalAxis: HorizontalAxis = defaultHorizontalAxis
    private verticalAxis: VerticalAxis = defaultVerticalAxis

    constructor(id: string){
        super(id)
    }

    public addChartLine(chartLine: ChartLine){
        this.chartLines.push(chartLine)
        return this;
    }

    public draw(){
        drawLineChart(this)
    }

}
