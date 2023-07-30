import { LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";
import { Domain } from "../model/domain-linker.js";

export const drawBrush = (chartStructure: ChartStructure, chart: LineChart) =>{
    if(chartStructure.brush === undefined){
        chartStructure.brush = d3.brushX()
            .extent([[0, 0], [chart.getClientWidth(), chart.getClientHeight() - chart.verticalAxis.offset.bottom - chart.verticalAxis.offset.top]])
        chartStructure.brush.on("end", (event:any) => onBrush(event, chart))
        chartStructure.brushGroup = chartStructure.chartGroup
            .append('g')
            .attr("transform", "translate(0," + chart.verticalAxis.offset.top + ")")
            .attr("class", "brush")
            .call(chartStructure.brush);
            moveBrush(chartStructure, chart, chart.timeDomain as Date[])
    }

}

const moveBrush = (chartStructure: ChartStructure, chart: LineChart, domain: Domain) =>{
    let x1 = chart.timeScale(domain[0])
    let x2 = chart.timeScale(domain[1])
    chartStructure.brushGroup.call(chartStructure.brush.move, [x1,x2]);
}

const onBrush = (event: any, chart: LineChart) => {
    if(chart.brush === undefined) return;
    if (event.sourceEvent === undefined) return  // ignore brush-by-zoom
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale)
    chart.brush.domainLinker.pushDomain(newDomain)
    //TODO: Zoom other chart when brushing
}