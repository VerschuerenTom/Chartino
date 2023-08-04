import { ChartLine } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";

export type AutoScaleData = {
    lineData: [Date, number][];
    data: number[];
    verticalDomain: number[];
    verticalScale: any;
} | null;

export const getAutoScaleData = (chartStructure: ChartStructure, line: ChartLine, domain: number[]): AutoScaleData => {
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
            chartStructure.chart.offsets.top,
            chartStructure.chart.getClientHeight() - chartStructure.chart.offsets.bottom,
            0,
        ]);
    return { lineData, data, verticalDomain, verticalScale };
};
