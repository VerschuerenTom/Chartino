import * as d3 from "d3";
export const drawTooltip = (chartStructure, chart) => {
    if (chart.getChartlines().length === 0 || chart.tooltip === undefined) {
        return;
    }
    const tooltipDiv = getTooltipDiv(chart);
    chartStructure.chartGroup
        .append("g")
        .style("pointer-events", "none");
    chartStructure.getSvg()
        .on("pointerenter pointermove", (event) => onTooltip(event, chart, tooltipDiv))
        .on("pointerleave", (event) => onTooltipLeave(event, chart, tooltipDiv));
};
const onTooltip = (event, chart, tooltipDiv) => {
    if (chart.tooltip === undefined) {
        return;
    }
    const timestamps = chart.timestamps;
    const verticalPointer = d3.pointer(event)[0];
    const intersectionPoint = d3.bisectCenter(timestamps, chart.timeScale.invert(verticalPointer));
    const currentTimestamp = timestamps[intersectionPoint];
    const tooltipData = chart.getChartlines().map(line => {
        return {
            value: line.getValue(currentTimestamp),
            color: line.color
        };
    });
    const presentation = chart.tooltip.callback(currentTimestamp, tooltipData);
    tooltipDiv.selectAll("*").remove();
    const { x, y } = chart.tooltip.positionCallback(event.pageX, event.pageY);
    tooltipDiv
        .append("div")
        .style("position", "fixed")
        .html(presentation)
        .style("top", (y) + "px").style("left", (x) + "px");
};
const onTooltipLeave = (event, chart, tooltipDiv) => {
    tooltipDiv.selectAll("*").remove();
};
const getTooltipDiv = (chart) => {
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
