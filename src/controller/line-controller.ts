import { ChartLine, LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";

export const drawLines = (chartStructure: ChartStructure, chart:LineChart) => {
    if(chartStructure.chartGroup === undefined){
        return;
    }
    if(chartStructure.linesGroup === undefined){
        chartStructure.linesGroup = chartStructure.chartGroup.append("g")
    }
    chartStructure.linesGroup.selectAll("*").remove();

    const timeScale = chart.timeScale;
    const verticalScale = chart.verticalScale

    chart.getChartlines().forEach(chartLine => {
        drawLine(timeScale, verticalScale, chartStructure, chartLine);
    });

}

function drawLine(timeScale: any, verticalScale: any, chartStructure: ChartStructure, chartLine: ChartLine) {
    const line = d3.line()
        .defined((d) => !isNaN(d[1]))
        .x((d) => {
            return timeScale(d[0]);
        })
        .y(function (d) {
            return verticalScale(d[1]);
        })
        .curve(d3.curveLinear);

    chartStructure.linesGroup
        .append("path")
        .attr("fill", "none")
        .datum(chartLine.dataEntries)
        .attr("d", line)
        .attr("stroke", chartLine.color);
}
