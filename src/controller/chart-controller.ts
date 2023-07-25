import { LineChart } from "../model/linechart"
import * as d3 from "d3";
import { clearSvg, initChartStructure } from "./svg-controller";
import { ChartStructure } from "../model/chart-structure";



export const drawLineChart = (lineChart: LineChart) => {
    clearSvg(lineChart.getChartRef());
    const chartStructure: ChartStructure = initChartStructure(lineChart.getChartRef());
    
}


