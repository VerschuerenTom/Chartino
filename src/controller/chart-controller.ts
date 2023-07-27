import { LineChart } from "../model/linechart.mjs"
import * as d3 from "d3";
import { clearSvg, initChartStructure } from "./svg-controller.js";
import { ChartStructure } from "../model/chart-structure.js";



export const drawLineChart = (lineChart: LineChart) => {
    clearSvg(lineChart.getId());
    const chartStructure: ChartStructure = initChartStructure(lineChart);
    
}


