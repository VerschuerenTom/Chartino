import { LineChart } from "../model/linechart.mjs"
import * as d3 from "d3";
import { clearSvg, initChartStructure } from "./svg-controller.js";
import { ChartStructure } from "../model/chart-structure.js";
import { drawAxes, drawHorizontalAxis } from "./axis-controller.js";
import { ChartLine } from "../model/chart-line.mjs";



export const drawLineChart = (lineChart: LineChart) => {
    clearSvg(lineChart.getId());
    const chartStructure: ChartStructure = initChartStructure(lineChart);
    
    const chartlines: ChartLine[] = lineChart.getChartlines()



   lineChart.timeDomain = chartlines[0].timeDomain
   lineChart.verticalDomain = chartlines[0].verticalDomain

   /*chartStructure.verticalAxisGroup = chartStructure.chartGroup.append("g");
   chartStructure.horizontalAxisGroup = chartStructure.chartGroup.append("g").attr("transform", "translate(0," +  (chartStructure.chart.getClientHeight() - lineChart.horizontalAxis.offset.bottom) + ")");

   let verticalAxis = d3.axisLeft(lineChart.verticalScale)
  chartStructure.verticalAxisGroup.call(verticalAxis)

  
  let horizontalAxis = d3.axisBottom(lineChart.timeScale)
  chartStructure.horizontalAxisGroup.call(horizontalAxis) */
  drawAxes(chartStructure, lineChart)
    
}




