import * as d3 from "d3";
import { ChartStructure } from "../model/chart-structure.js";
import { LineChart } from "../index.mjs";

export const initChartStructure = (lineChart: LineChart) => {
    const svg = d3.select("#" + lineChart.getId())
        .append("svg")
        .attr("width", lineChart.getClientWidth())
        .attr("height", lineChart.getClientHeight());
    const chartStructure: ChartStructure =  new ChartStructure(svg);
    chartStructure.setChartGroup(svg.append('g')) //TODO: Transform for horizontal and vertical axis.
    return chartStructure;
}

export const clearSvg = (id: string) =>{
    d3.select("#" + id).selectAll("*").remove()
}