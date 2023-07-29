import * as d3 from "d3";
export const drawBrush = (chartStructure, chart) => {
    if (chartStructure.brush === undefined) {
        chartStructure.brush = d3.brushX()
            .extent([[0, 0], [chart.getClientWidth(), chart.getClientHeight()]]);
        //chartStructure.brush.on("end", (event:any) => onBrush(event, chart))
        chartStructure.brushGroup = chartStructure.chartGroup
            .append('g')
            .attr("class", "brush")
            .call(chartStructure.brush);
    }
};
/*const onBrush = (event: any, chart: LineChart) => {
    //TODO: Zoom other chart when brushing
}*/ 
