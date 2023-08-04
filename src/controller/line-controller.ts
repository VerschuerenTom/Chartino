import { ChartLine, LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";
import { Color } from "../model/color.js";
import { AutoScaleData, getAutoScaleData } from "../calculators/autoscale-calculator.js";

export const drawLines = (chartStructure: ChartStructure, chart: LineChart) => {
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

function drawLine(timeScale: any, verticalScale: any, chartStructure: ChartStructure, chartLine: ChartLine) {
    let autoScaleData: AutoScaleData = null;
    if (chartLine.isAutoScale) {
        autoScaleData = getAutoScaleData(chartStructure, chartLine, chartStructure.chart.timeDomain as number[]);
        chartLine.verticalScale = autoScaleData?.verticalScale;
        drawSvgLine(timeScale, autoScaleData?.verticalScale, chartStructure, autoScaleData?.lineData, chartLine.color);
    } else {
        drawSvgLine(timeScale, verticalScale, chartStructure, chartLine.lineData, chartLine.color);
    }
}

function drawSvgLine(timeScale: any, verticalScale: any, chartStructure: ChartStructure, data: any, color: Color) {
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
