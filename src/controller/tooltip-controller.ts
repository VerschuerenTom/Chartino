import { LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";

export const drawTooltip = (chartStructure: ChartStructure, chart: LineChart) => {
    if (chart.getChartlines().length === 0 || chart.tooltip === undefined) {
        return;
    }
    const tooltipDiv = getTooltipDiv(chart);
    chartStructure.chartGroup.append("g").style("pointer-events", "none");
    chartStructure
        .getSvg()
        .on("pointerenter pointermove", (event: any) => onTooltip(event, chart, chartStructure))
        .on("pointerleave", (event: any) => onTooltipLeave(event, chart, tooltipDiv));
};

const onTooltip = (event: any, chart: LineChart, chartStructure: ChartStructure) => {
    if (chart.tooltip === undefined) {
        return;
    }
    const timestamps = chart.timestamps;
    const verticalPointer = d3.pointer(event)[0];
    const intersectionPoint = d3.bisectCenter(timestamps, chart.timeScale.invert(verticalPointer));
    const currentTimestamp = timestamps[intersectionPoint];

    const tooltipData = chart.getChartlines().map((line) => {
        const value = line.getValue(currentTimestamp);
        return {
            pointX: chart.timeScale(currentTimestamp),
            pointY: chart.verticalScale(value),
            timestamp: currentTimestamp,
            value: value,
            color: line.color,
        };
    });

    chart.tooltip.callback(chartStructure.getSvg(), tooltipData, {
        svgHeight: chart.getClientHeight(),
        svgWidth: chart.getClientWidth(),
        offset: chart.verticalAxis.offset,
    });
    /*const presentation = chart.tooltip.callback(currentTimestamp, tooltipData);
    tooltipDiv.selectAll("*").remove();
    const { x, y } = chart.tooltip.positionCallback(event.pageX, event.pageY);
    tooltipDiv
        .append("div")
        .style("position", "fixed")
        .html(presentation)
        .style("top", y + "px")
        .style("left", x + "px"); */
};

const onTooltipLeave = (event: any, chart: LineChart, tooltipDiv: any) => {
    tooltipDiv.selectAll("*").remove();
};

const getTooltipDiv = (chart: LineChart) => {
    const tooltipId = "tooltip-div-" + chart.getId();
    let tooltipDiv;
    if (document.getElementById(tooltipId) === null) {
        tooltipDiv = document.createElement("div");
        tooltipDiv.setAttribute("id", tooltipId);
        document.body.appendChild(tooltipDiv);
        tooltipDiv = d3.select("#" + tooltipId);
        return tooltipDiv;
    }
};
