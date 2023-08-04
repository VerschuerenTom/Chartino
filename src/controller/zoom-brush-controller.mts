import { LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";
import { Domain } from "../model/domain-linker.js";
import { drawAxes } from "./axis-controller.js";
import { drawLines } from "./line-controller.js";

export const drawZoomBrush = (chartStructure: ChartStructure, chart: LineChart) => {
    if (chart.zoomBrush === undefined) {
        return;
    }
    if (chartStructure.zoomBrush === undefined) {
        chartStructure.zoomBrush = d3.brushX().extent([
            [0, 0],
            [
                chart.getClientWidth(),
                chart.getClientHeight() - chart.verticalAxis.offset.bottom - chart.verticalAxis.offset.top,
            ],
        ]);
        chart.zoomBrush.domainLinker.setFullDomain(chart.timeDomain as Domain);
        chartStructure.zoomBrush.on("end", (event: any) => onZoomBrushEnd(event, chart, chartStructure));
        chartStructure.zoomBrush.on("start brush", (event: any) => onZoomBrush(event, chart, chartStructure));
        chartStructure.zoomBrushGroup = chartStructure.chartGroup
            .append("g")
            .attr("class", "zoomBrush")
            .attr("transform", "translate(0," + chart.verticalAxis.offset.top + ")")
            .call(chartStructure.zoomBrush);
        chart.zoomBrush.domainLinker.subscribe((domain: Domain) => zoom(domain, chartStructure, chart));
    }
};

const zoom = (domain: Domain, chartStructure: ChartStructure, chart: LineChart) => {
    chartStructure.zoomBrushGroup.call(chartStructure.zoomBrush.move, null);
    chart.timeDomain = domain;
    drawAxes(chartStructure, chart);
    drawLines(chartStructure, chart);
};

const onZoomBrushEnd = (event: any, chart: LineChart, structure: ChartStructure) => {
    if (event.mode !== "handle" || chart.zoomBrush === undefined || event.selection === null) {
        return;
    }
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale) as Domain;
    chart.zoomBrush.domainLinker.pushDomain(newDomain);
    structure.getSvg().selectAll(".testing2").remove();
};

const onZoomBrush = (event: any, chart: LineChart, structure: ChartStructure) => {
    if (event.mode !== "handle" || chart.zoomBrush === undefined || event.selection === null) {
        return;
    }
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale) as Domain;
    structure.getSvg().selectAll(".testing2").remove();

    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing2")
        .attr("x", event.selection[0] - 50)
        .attr("y", chart.getClientHeight() - chart.verticalAxis.offset.bottom)
        .attr("width", 100)
        .attr("height", 18)
        .attr("rx", 3)
        .attr("ry", 3)
        .style("fill", "black");
    structure
        .getSvg()
        .append("text")
        .attr("class", "testing2")
        .attr("x", event.selection[0] - 45)
        .attr("y", chart.getClientHeight() - chart.verticalAxis.offset.bottom + 12)
        .text(new Date(newDomain[0]).toLocaleString("nl-be"))
        .style("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "500");

    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing2")
        .attr("x", event.selection[1] - 50)
        .attr("y", chart.verticalAxis.offset.top - 17)
        .attr("width", 100)
        .attr("height", 18)
        .attr("rx", 3)
        .attr("ry", 3)
        .style("fill", "black");
    structure
        .getSvg()
        .append("text")
        .attr("class", "testing2")
        .attr("x", event.selection[1] - 45)
        .attr("y", chart.verticalAxis.offset.top - 5)
        .text(new Date(newDomain[1]).toLocaleString("nl-be"))
        .style("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "500");

    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing2")
        .attr("x", event.selection[1] - 50)
        .attr("y", chart.verticalAxis.offset.top + 2)
        .attr("width", 100)
        .attr("height", 18)
        .attr("rx", 3)
        .attr("ry", 3)
        .style("fill", "black");
    structure
        .getSvg()
        .append("text")
        .attr("class", "testing2")
        .attr("x", event.selection[1] - 45)
        .attr("y", chart.verticalAxis.offset.top + 14)
        .text(getTimeDifference(newDomain[0], newDomain[1]))
        .style("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "500");
};

function getTimeDifference(start: number, end: number) {
    const timeDifferenceInSeconds = Math.abs((end - start) / 1000);

    const days = Math.floor(timeDifferenceInSeconds / (60 * 60 * 24));
    const hours = Math.floor((timeDifferenceInSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((timeDifferenceInSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(timeDifferenceInSeconds % 60);

    let result = "";
    let count = 0;

    if (days > 0 && count < 2) {
        result += `${days} days, `;
        count++;
    }
    if (hours > 0 && count < 2) {
        result += `${hours} hours, `;
        count++;
    }
    if (minutes > 0 && count < 2) {
        result += `${minutes} min, `;
        count++;
    }
    if (seconds > 0 && count < 2) {
        result += `${seconds} sec`;
    }

    // Remove trailing comma and space
    result = result.replace(/, $/, "");

    return result;
}
