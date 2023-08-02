import * as d3 from "d3";
export const drawLines = (chartStructure, chart) => {
    if (chartStructure.chartGroup === undefined) {
        return;
    }
    if (chartStructure.linesGroup === undefined) {
        chartStructure.linesGroup = chartStructure.chartGroup.append("g");
    }
    chartStructure.linesGroup.selectAll("*").remove();
    const timeScale = chart.timeScale;
    const verticalScale = chart.verticalScale;
    chart.getChartlines().forEach((chartLine) => {
        drawLine(timeScale, verticalScale, chartStructure, chartLine);
    });
};
const getAutoScaleData = (chartStructure, line, domain) => {
    const timestamps = line.timestamps;
    const lineData = [];
    const data = [];
    let lowestValue = null;
    let highestValue = null;
    for (let i = 0; i < timestamps.length; i++) {
        if (timestamps[i - 1] > domain[1]) {
            break;
        }
        if (timestamps[i + 1] > domain[0] || i === timestamps.length - 1) {
            data.push(line.data[i]);
            lineData.push([new Date(timestamps[i]), line.data[i]]);
            highestValue = highestValue == null ? line.data[i] : Math.max(line.data[i], highestValue);
            lowestValue = lowestValue == null ? line.data[i] : Math.min(line.data[i], lowestValue);
        }
    }
    const verticalDomain = [lowestValue, highestValue];
    if (verticalDomain.some((i) => i === null)) {
        return null;
    }
    const verticalScale = d3
        .scaleLinear()
        .domain(verticalDomain)
        .range([
        chartStructure.chart.horizontalAxis.offset.top,
        chartStructure.chart.getClientHeight() - chartStructure.chart.horizontalAxis.offset.bottom,
        0,
    ]);
    return { lineData, data, verticalDomain, verticalScale };
};
//TODO: Refactor this
function drawLine(timeScale, verticalScale, chartStructure, chartLine) {
    let autoScaleData = null;
    if (chartLine.isAutoScale) {
        autoScaleData = getAutoScaleData(chartStructure, chartLine, chartStructure.chart.timeDomain);
        drawSvgLine(timeScale, autoScaleData === null || autoScaleData === void 0 ? void 0 : autoScaleData.verticalScale, chartStructure, autoScaleData === null || autoScaleData === void 0 ? void 0 : autoScaleData.lineData, chartLine.color);
    }
    else {
        drawSvgLine(timeScale, verticalScale, chartStructure, chartLine.lineData, chartLine.color);
    }
}
function drawSvgLine(timeScale, verticalScale, chartStructure, data, color) {
    const line = d3
        .line()
        .defined((d) => !isNaN(d[1]))
        .x((d) => {
        return timeScale(d[0]);
    })
        .y(function (d) {
        return verticalScale(d[1]);
    })
        .curve(d3.curveLinear);
    chartStructure.linesGroup.append("path").attr("fill", "none").datum(data).attr("d", line).attr("stroke", color);
}
