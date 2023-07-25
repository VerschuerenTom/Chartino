import { drawLineChart } from "../controller/chart-controller";
import { BaseChart } from "./basechart";
import { ChartLine } from "./chart-line";
import { HorizontalAxis, defaultHorizontalAxis } from "./horizontal-axis";
import { VerticalAxis, defaultVerticalAxis } from "./vertical-axis";

export class LineChart extends BaseChart{

    private chartLines: ChartLine[] = []
    private horizontalAxis: HorizontalAxis = defaultHorizontalAxis
    private verticalAxis: VerticalAxis = defaultVerticalAxis

    constructor(id: string, chartRef: any){
        super(id, chartRef)
    }

    public addChartLine(chartLine: ChartLine){
        this.chartLines.push(chartLine)
        return this;
    }

    public draw(){
        drawLineChart(this)
    }

}
