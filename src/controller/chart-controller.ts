import { LineChart } from "../model/linechart.mjs"
import { clearSvg, initChartStructure } from "./svg-controller.js";
import { ChartStructure } from "../model/chart-structure.js";
import { drawAxes } from "./axis-controller.js";
import { ChartLine } from "../model/chart-line.mjs";
import { drawLines } from "./line-controller.js";



export const drawLineChart = (lineChart: LineChart) => {
    clearSvg(lineChart.getId());
    const chartStructure: ChartStructure = initChartStructure(lineChart);
    
    const chartlines: ChartLine[] = lineChart.getChartlines()



    //TODO: fix for when we have multiple lines
   lineChart.timeDomain = chartlines[0].timeDomain
   lineChart.verticalDomain = chartlines[0].verticalDomain

  drawAxes(chartStructure, lineChart)
  drawLines(chartStructure, lineChart)
    
}




