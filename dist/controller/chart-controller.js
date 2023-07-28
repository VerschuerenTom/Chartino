import { clearSvg, initChartStructure } from "./svg-controller.js";
import { drawAxes } from "./axis-controller.js";
export const drawLineChart = (lineChart) => {
    clearSvg(lineChart.getId());
    const chartStructure = initChartStructure(lineChart);
    const chartlines = lineChart.getChartlines();
    lineChart.timeDomain = chartlines[0].timeDomain;
    lineChart.verticalDomain = chartlines[0].verticalDomain;
    /*chartStructure.verticalAxisGroup = chartStructure.chartGroup.append("g");
    chartStructure.horizontalAxisGroup = chartStructure.chartGroup.append("g").attr("transform", "translate(0," +  (chartStructure.chart.getClientHeight() - lineChart.horizontalAxis.offset.bottom) + ")");
 
    let verticalAxis = d3.axisLeft(lineChart.verticalScale)
   chartStructure.verticalAxisGroup.call(verticalAxis)
 
   
   let horizontalAxis = d3.axisBottom(lineChart.timeScale)
   chartStructure.horizontalAxisGroup.call(horizontalAxis) */
    drawAxes(chartStructure, lineChart);
};
