import { LineChart } from "../index.mjs"
import { ChartStructure } from "../model/chart-structure.js"
import * as d3 from "d3";
import { Domain } from "../model/domain-linker.js";
import { drawAxes } from "./axis-controller.js";
import { drawLines } from "./line-controller.js";

export const drawZoomBrush = (chartStructure:ChartStructure, chart: LineChart) => {
    if(chart.zoomBrush === undefined){
        return
    }
    if(chartStructure.zoomBrush === undefined){
    chartStructure.zoomBrush = d3.brushX()
    .extent([[0, 0], [chart.getClientWidth(), chart.getClientHeight() - chart.verticalAxis.offset.bottom - chart.verticalAxis.offset.top]])
    chart.zoomBrush.domainLinker.setFullDomain(chart.timeDomain as Domain)
    chartStructure.zoomBrush.on("end", (event:any) => onZoomBrush(event, chart))
    chartStructure.zoomBrushGroup = chartStructure.chartGroup
        .append('g')
        .attr("class", "zoomBrush")
        .attr("transform", "translate(0," + chart.verticalAxis.offset.top + ")")
        .call(chartStructure.zoomBrush);
    chart.zoomBrush.domainLinker.subscribe((domain:Domain) => zoom(domain, chartStructure, chart) )

    }
}

const zoom = (domain:Domain, chartStructure: ChartStructure, chart:LineChart) => {
    chartStructure.zoomBrushGroup.call(chartStructure.zoomBrush.move, null)
    chart.timeDomain = domain as Date[]
    drawAxes(chartStructure, chart)
    drawLines(chartStructure, chart)

}


const onZoomBrush = (event:any, chart:LineChart) => {
    if (event.mode !== "handle" || chart.zoomBrush === undefined || event.selection === null) {
        return;
    }
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale) as Domain
    chart.zoomBrush.domainLinker.pushDomain(newDomain)
}