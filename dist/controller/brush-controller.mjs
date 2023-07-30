import * as d3 from "d3";
//TODO: Add events for when another charts zooms,brushes to update this one
export const drawBrush = (chartStructure, chart) => {
    var _a;
    if (chart.brush === undefined) {
        return;
    }
    if (chartStructure.brush === undefined) {
        chartStructure.brush = d3.brushX()
            .extent([[chart.verticalAxis.offset.left, 0], [chart.getClientWidth() - chart.verticalAxis.offset.right, chart.getClientHeight() - chart.verticalAxis.offset.bottom - chart.verticalAxis.offset.top]]);
        chart.brush.domainLinker.setFullDomain(chart.timeDomain);
        chartStructure.brush.on("end", (event) => onBrush(event, chart));
        chartStructure.brushGroup = chartStructure.chartGroup
            .append('g')
            .attr("transform", "translate(0," + chart.verticalAxis.offset.top + ")")
            .attr("class", "brush")
            .call(chartStructure.brush);
        moveBrush(chartStructure, chart, chart.timeDomain);
        (_a = chart.brush) === null || _a === void 0 ? void 0 : _a.domainLinker.subscribe((domain) => moveBrush(chartStructure, chart, domain));
    }
};
const moveBrush = (chartStructure, chart, domain) => {
    let x1 = chart.timeScale(domain[0]);
    let x2 = chart.timeScale(domain[1]);
    chartStructure.brushGroup.call(chartStructure.brush.move, [x1, x2]);
};
const onBrush = (event, chart) => {
    if (chart.brush === undefined)
        return;
    if (event.sourceEvent === undefined)
        return; // ignore brush-by-zoom
    const newDomain = event.selection.map(chart.timeScale.invert, chart.timeScale);
    chart.brush.domainLinker.pushDomain(newDomain);
};
