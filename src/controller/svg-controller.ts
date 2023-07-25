import * as d3 from "d3";
import { ChartStructure } from "../model/chart-structure";

export const initChartStructure = (chartRef: any) => {
    const svg = d3.select(chartRef.current)
        .append("svg")
        .attr("width", chartRef.current.clientWidth)
        .attr("height", (chartRef.current.clientHeight));
    const chartStructure: ChartStructure =  new ChartStructure(svg);
    chartStructure.setChartGroup(svg.append('g')) //TODO: Transform for horizontal and vertical axis.
    return chartStructure;
}

export const clearSvg = (chartRef: any) =>{
    d3.select(chartRef.current).selectAll("*").remove()
}