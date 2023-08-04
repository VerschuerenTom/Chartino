import * as d3 from "d3";
import { getAutoScaleData } from "../calculators/autoscale-calculator.js";
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
function drawLine(timeScale, verticalScale, chartStructure, chartLine) {
    let autoScaleData = null;
    if (chartLine.isAutoScale) {
        autoScaleData = getAutoScaleData(chartStructure, chartLine, chartStructure.chart.timeDomain);
        chartLine.verticalScale = autoScaleData === null || autoScaleData === void 0 ? void 0 : autoScaleData.verticalScale;
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
