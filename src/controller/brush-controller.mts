import { LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";
import { Domain } from "../model/domain-linker.js";

//TODO: Add events for when another charts zooms,brushes to update this one

export const drawBrush = (chartStructure: ChartStructure, chart: LineChart) => {
    if (chart.brush === undefined) {
        return;
    }
    if (chartStructure.brush === undefined) {
        chartStructure.brush = d3.brushX().extent([
            [chart.offsets.left, -1],
            [
                chart.getClientWidth() - chart.offsets.right,
                chart.getClientHeight() - chart.offsets.bottom - chart.offsets.top - 1,
            ],
        ]);
        chart.brush.domainLinker.setFullDomain(chart.timeDomain as Domain);
        chartStructure.brush.on("end", (event: any) => onBrushEnd(event, chart));
        chartStructure.brush.on("start brush", (event: any) => onBrush(event, chart, chartStructure));
        chartStructure.brushGroup = chartStructure.chartGroup
            .append("g")
            .attr("transform", "translate(0," + chart.offsets.top + ")")
            .attr("class", chart.getId() + "-brush")
            .call(chartStructure.brush);
        moveBrush(chartStructure, chart, chart.timeDomain as number[]);
        chart.brush?.domainLinker.subscribe((domain) => moveBrush(chartStructure, chart, domain));
        moveBrush(chartStructure, chart, chart.brush.domainLinker.getCurrentDomain());
    }
};

const moveBrush = (chartStructure: ChartStructure, chart: LineChart, domain: Domain) => {
    const x1 = chart.timeScale(domain[0]);
    const x2 = chart.timeScale(domain[1]);
    chartStructure.brushGroup.call(chartStructure.brush.move, [x1, x2]);
};

const onBrushEnd = (event: any, chart: LineChart) => {
    if (chart.brush === undefined) return;
    if (event.sourceEvent === undefined) return; // ignore brush-by-zoom
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale);
    chart.brush.domainLinker.pushDomain(newDomain);
};

const onBrush = (event: any, chart: LineChart, structure: ChartStructure) => {
    if (event.selection === null) {
        return;
    }
    const timeDomain = event.selection.map(chart.timeScale.invert, chart.timeScale);

    //const sx = event.selection.map(chart.timeScale.invert);
    structure.getSvg().selectAll(".testing").remove();

    const path = d3.path();
    path.moveTo(chart.offsets.left, 0);
    path.lineTo(event.selection[0], 0);
    path.lineTo(event.selection[0], chart.getClientHeight() - chart.offsets.bottom - chart.offsets.top);
    path.lineTo(event.selection[1], chart.getClientHeight() - chart.offsets.bottom - chart.offsets.top);
    path.lineTo(event.selection[1], 0);
    path.lineTo(chart.getClientWidth() - chart.offsets.right, 0);

    structure
        .getSvg()
        .select(".chartTwo-brush")
        .append("path")
        .data([type("selection")])
        .attr("cursor", "move")
        .attr("class", "testing")
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "black");

    structure
        .getSvg()
        .selectAll(".chartTwo-brush")
        .append("rect")
        .attr("class", "testing")
        .data([type("overlay")])
        .attr("cursor", "crosshair")
        .attr("x", chart.offsets.left)
        .attr("y", 0)
        .attr("width", event.selection[0] - chart.offsets.left)
        .attr("height", chart.getClientHeight() - chart.offsets.bottom - chart.offsets.top)
        .style("fill", "grey")
        .style("fill-opacity", "50%");

    structure
        .getSvg()
        .selectAll(".chartTwo-brush")
        .append("rect")
        .attr("class", "testing")
        .data([type("overlay")])
        .attr("cursor", "crosshair")
        .attr("x", event.selection[1])
        .attr("y", 0)
        .attr("width", chart.getClientWidth() - event.selection[1] - chart.offsets.right)
        .attr("height", chart.getClientHeight() - chart.offsets.bottom - chart.offsets.top)
        .style("fill", "grey")
        .style("fill-opacity", "50%");

    structure
        .getSvg()
        .select(".chartTwo-brush")
        .append("rect")
        .attr("class", "handle handle--w testing")
        .data([type("w")])
        .attr("cursor", "ew-resize")
        .attr("y", (chart.getClientHeight() - chart.offsets.top - chart.offsets.bottom) / 4)
        .attr("x", event.selection[0] - 10)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("width", 20)
        .attr("height", (chart.getClientHeight() - chart.offsets.top - chart.offsets.bottom) / 2)
        .style("visibility", "visible")
        .style("fill", "white")
        .style("stroke", "black");

    structure
        .getSvg()
        .select(".chartTwo-brush")
        .append("rect")
        .attr("class", "handle handle--e testing")
        .data([type("e")])
        .attr("cursor", "ew-resize")
        .attr("y", (chart.getClientHeight() - chart.offsets.top - chart.offsets.bottom) / 4)
        .attr("x", event.selection[1] - 10)
        .attr("rx", 3)
        .attr("ry", 3)
        .attr("width", 20)
        .attr("height", (chart.getClientHeight() - chart.offsets.top - chart.offsets.bottom) / 2)
        .style("visibility", "visible")
        .style("fill", "white")
        .style("stroke", "black");

    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing")
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
        .attr("class", "testing")
        .attr("x", event.selection[0] - 45)
        .attr("y", chart.getClientHeight() - chart.offsets.bottom + 12)
        .text(new Date(timeDomain[0]).toLocaleString("nl-be"))
        .style("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "500");

    structure
        .getSvg()
        .append("rect")
        .attr("class", "testing")
        .attr("x", event.selection[1] - 50)
        .attr("y", chart.getClientHeight() - chart.offsets.bottom)
        .attr("width", 100)
        .attr("height", 18)
        .attr("rx", 3)
        .attr("ry", 3)
        .style("fill", "black");
    structure
        .getSvg()
        .append("text")
        .attr("class", "testing")
        .attr("x", event.selection[1] - 45)
        .attr("y", chart.getClientHeight() - chart.offsets.bottom + 12)
        .text(new Date(timeDomain[1]).toLocaleString("nl-be"))
        .style("fill", "white")
        .style("font-size", "11px")
        .style("font-weight", "500");
};

function type(t: any) {
    return { type: t };
}
