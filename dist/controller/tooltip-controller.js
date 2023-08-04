import * as d3 from "d3";
export const drawTooltip = (chartStructure, chart) => {
    if (chart.getChartlines().length === 0 || chart.tooltip === undefined) {
        return;
    }
    //const tooltipDiv = getTooltipDiv(chart);
    chartStructure.chartGroup.append("g").style("pointer-events", "none");
    chartStructure.getSvg().on("pointerenter pointermove", (event) => onTooltip(event, chart, chartStructure));
    //.on("pointerleave", (event: any) => onTooltipLeave());
};
const onTooltip = (event, chart, chartStructure) => {
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
        offset: chart.offsets,
    });
};
