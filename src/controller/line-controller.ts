import { ChartLine, LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";
import { Color } from "../model/color.js";

type AutoScaleData = {
    lineData: [Date, number][];
    data: number[];
    verticalDomain: number[];
    verticalScale: any;
} | null;

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

const getAutoScaleData = (chartStructure: ChartStructure, line: ChartLine, domain: number[]): AutoScaleData => {
    const timestamps = line.timestamps;
    const lineData: [Date, number][] = [];
    const data: number[] = [];
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
    const verticalDomain = [lowestValue, highestValue] as number[];
    if (verticalDomain.some((i) => i === null)) {
        return null;
    }

    const verticalScale = d3
        .scaleLinear()
        .domain(verticalDomain as number[])
        .range([
            chartStructure.chart.horizontalAxis.offset.top,
            chartStructure.chart.getClientHeight() - chartStructure.chart.horizontalAxis.offset.bottom,
            0,
        ]);
    return { lineData, data, verticalDomain, verticalScale };
};

//TODO: Refactor this
function drawLine(timeScale: any, verticalScale: any, chartStructure: ChartStructure, chartLine: ChartLine) {
    let autoScaleData: AutoScaleData = null;
    if (chartLine.isAutoScale) {
        autoScaleData = getAutoScaleData(chartStructure, chartLine, chartStructure.chart.timeDomain as number[]);
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
