import { ChartLine } from "../model/chart-line";
import { LineChart } from "../model/linechart";

const linechart: LineChart = new LineChart("id", "chart")

const data = [[1690310054224, 41], [1690310119501, 6], [1690310131060,7]]

const chartLine: ChartLine = new ChartLine(data)

linechart.addChartLine(chartLine).draw()