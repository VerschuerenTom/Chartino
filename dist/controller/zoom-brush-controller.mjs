import * as d3 from "d3";
import { drawAxes } from "./axis-controller.js";
import { drawLines } from "./line-controller.js";
export const drawZoomBrush = (chartStructure, chart) => {
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
        chart.zoomBrush.domainLinker.setFullDomain(chart.timeDomain);
        chartStructure.zoomBrush.on("end", (event) => onZoomBrush(event, chart));
        chartStructure.zoomBrushGroup = chartStructure.chartGroup
            .append("g")
            .attr("class", "zoomBrush")
            .attr("transform", "translate(0," + chart.verticalAxis.offset.top + ")")
            .call(chartStructure.zoomBrush);
        chart.zoomBrush.domainLinker.subscribe((domain) => zoom(domain, chartStructure, chart));
    }
};
const zoom = (domain, chartStructure, chart) => {
    chartStructure.zoomBrushGroup.call(chartStructure.zoomBrush.move, null);
    chart.timeDomain = domain;
    drawAxes(chartStructure, chart);
    drawLines(chartStructure, chart);
};
const onZoomBrush = (event, chart) => {
    if (event.mode !== "handle" || chart.zoomBrush === undefined || event.selection === null) {
        return;
    }
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale);
    chart.zoomBrush.domainLinker.pushDomain(newDomain);
};
