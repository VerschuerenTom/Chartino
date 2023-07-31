import { LineChart } from "../index.mjs";

import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";
import { VerticalAxis } from "../model/vertical-axis.js";

export const drawAxes = (chartStructure: ChartStructure, chart: LineChart) => {
    const vAxis = chart.verticalAxis;
    const height = chart.getClientHeight() - vAxis.offset.bottom;
    drawVerticalAxis(chartStructure, height, chart);
    drawHorizontalAxis(chartStructure, vAxis, chart);
};

function drawHorizontalAxis(
    chartStructure: ChartStructure,
    vAxis: VerticalAxis,
    chart: LineChart
) {
    if (!chart.horizontalAxis.isEnabled) {
        return;
    }
    if (chartStructure.verticalAxisGroup === undefined) {
        chartStructure.verticalAxisGroup = chartStructure.chartGroup
            .append("g")
            .attr("transform", "translate(" + vAxis.offset.left + ", 0)");
    }
    chartStructure.verticalAxisGroup.selectAll("*").remove();
    const verticalAxis = d3.axisLeft(chart.verticalScale);
    chartStructure.verticalAxisGroup.call(verticalAxis);
}

function drawVerticalAxis(
    chartStructure: ChartStructure,
    height: number,
    chart: LineChart
) {
    if (!chart.verticalAxis.isEnabled) {
        return;
    }
    if (chartStructure.horizontalAxisGroup === undefined) {
        chartStructure.horizontalAxisGroup = chartStructure.chartGroup
            .append("g")
            .attr("transform", "translate(0," + height + ")");
    }
    chartStructure.horizontalAxisGroup.selectAll("*").remove();
    const horizontalAxis = d3.axisBottom(chart.timeScale);
    chartStructure.horizontalAxisGroup.call(horizontalAxis);
}
