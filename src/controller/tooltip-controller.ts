import { LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";

export const drawTooltip = (chartStructure: ChartStructure, chart: LineChart) => {
    if(chart.getChartlines().length === 0 || chart.tooltip === undefined){
        return;
    }
    const tooltipDiv = d3.select("#tooltip-div-" + chart.getId())

    chartStructure.chartGroup
        .append("g")
        .style("pointer-events", "none")
    chartStructure.getSvg()
        .on("pointerenter pointermove", (event: any) => onTooltip(event, chart,tooltipDiv))
        .on("pointerleave", (event: any) => onTooltipLeave(event, chart,tooltipDiv))

}

const onTooltip = (event: any,chart: LineChart,tooltipDiv:any) => {
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
    tooltipDiv.selectAll("*").remove()
    const {x, y} = chart.tooltip.positionCallback(event.pageX, event.pageY)
    tooltipDiv
        .append("div")
        .style("position", "fixed")
        .html(presentation)
        .style("top", (y) + "px").style("left", (x) + "px");
}

const onTooltipLeave = (event: any, chart: LineChart, tooltipDiv:any) => {
    tooltipDiv.selectAll("*").remove()
}