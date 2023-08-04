import * as d3 from "d3";
import { drawAxes } from "./axis-controller.js";
import { drawLines } from "./line-controller.js";
import { getTimeDifferenceString } from "../calculators/time-calculator.js";
export const drawZoomBrush = (chartStructure, chart) => {
    if (chart.zoomBrush === undefined) {
        return;
    }
    if (chartStructure.zoomBrush === undefined) {
        chartStructure.zoomBrush = d3.brushX().extent([
            [0, 0],
            [chart.getClientWidth(), chart.getClientHeight() - chart.offsets.bottom - chart.offsets.top],
        ]);
        chart.zoomBrush.domainLinker.setFullDomain(chart.timeDomain);
        chartStructure.zoomBrush.on("end", (event) => onZoomBrushEnd(event, chart, chartStructure));
        chartStructure.zoomBrush.on("start brush", (event) => onZoomBrush(event, chart, chartStructure));
        chartStructure.zoomBrushGroup = chartStructure.chartGroup
            .append("g")
            .attr("class", "zoomBrush")
            .attr("transform", "translate(0," + chart.offsets.top + ")")
            .call(chartStructure.zoomBrush);
        chart.zoomBrush.domainLinker.subscribe((domain) => zoom(domain, chartStructure, chart));
        zoom(chart.zoomBrush.domainLinker.getCurrentDomain(), chartStructure, chart);
    }
};
const zoom = (domain, chartStructure, chart) => {
    chartStructure.zoomBrushGroup.call(chartStructure.zoomBrush.move, null);
    chart.timeDomain = domain;
    drawAxes(chartStructure, chart);
    drawLines(chartStructure, chart);
};
const onZoomBrushEnd = (event, chart, structure) => {
    if (event.mode !== "handle" || chart.zoomBrush === undefined || event.selection === null) {
        return;
    }
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale);
    chart.zoomBrush.domainLinker.pushDomain(newDomain);
    structure.getSvg().selectAll(".testing2").remove();
};
const onZoomBrush = (event, chart, structure) => {
    if (event.mode !== "handle" || chart.zoomBrush === undefined || event.selection === null) {
        return;
    }
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale);
    structure.getSvg().selectAll(".testing2").remove();
    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing2")
        .attr("x", event.selection[0] - 50)
        .attr("y", chart.getClientHeight() - chart.offsets.bottom)
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
        .attr("y", chart.getClientHeight() - chart.offsets.bottom + 12)
        .text(new Date(newDomain[0]).toLocaleString("nl-be"))
        .style("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "500");
    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing2")
        .attr("x", event.selection[1] - 50)
        .attr("y", chart.offsets.top - 17)
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
        .attr("y", chart.offsets.top - 5)
        .text(new Date(newDomain[1]).toLocaleString("nl-be"))
        .style("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "500");
    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing2")
        .attr("x", event.selection[1] - 50)
        .attr("y", chart.offsets.top + 2)
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
        .attr("y", chart.offsets.top + 14)
        .text(getTimeDifferenceString(newDomain[0], newDomain[1]))
        .style("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "500");
};
