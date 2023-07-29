import * as d3 from "d3";
import { ChartStructure } from "../model/chart-structure.js";
export const initChartStructure = (lineChart) => {
    const svg = d3.select("#" + lineChart.getId())
        .append("svg")
        .attr("width", lineChart.getClientWidth())
        .attr("height", lineChart.getClientHeight());
    const chartStructure = new ChartStructure(svg, lineChart);
    chartStructure.chartGroup = svg.append('g');
    return chartStructure;
};
export const clearSvg = (id) => {
    console.log("clearing");
    d3.select("#" + id).selectAll("*").remove();
};
