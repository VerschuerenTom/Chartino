import { LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";

export const drawTooltip = (chartStructure: ChartStructure, chart: LineChart) => {
    if(chart.getChartlines().length === 0 || chart.tooltip === undefined){
        return;
    }

    chartStructure.chartGroup
        .append("g")
        .style("pointer-events", "none")
    chartStructure.getSvg()
        .on("pointerenter pointermove", (event: any) => onTooltip(event, chart))
        .on("pointerleave", (event: any) => onTooltipLeave(event, chart))

}

const onTooltip = (event: any,chart: LineChart,) => {
    if(chart.tooltip === undefined){
        return;
    }
    const timestamps = chart.timestamps;
    const verticalPointer = d3.pointer(event)[0]
    const intersectionPoint = d3.bisectCenter(timestamps,chart.timeScale.invert(verticalPointer))
    const currentTimestamp = timestamps[intersectionPoint]

    const tooltipData = chart.getChartlines().map(line => {
        return {
            value: line.getValue(currentTimestamp),
            color: line.color
        }
    })

    const presentation = chart.tooltip.callback(currentTimestamp, tooltipData)
    const tooltipDiv = d3.select("#tooltip-div-" + chart.getId())
    tooltipDiv.selectAll("*").remove()
    tooltipDiv
        .append("div")
        .style("position", "fixed")
        .html(presentation)
        .style("top", (event.pageY) + "px").style("left", (event.pageX) + "px");
}

const onTooltipLeave = (event: any, chart: LineChart) => {
    d3.select("#tooltip-div-" + chart.getId()).selectAll("*").remove()
}