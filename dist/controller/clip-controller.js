export const drawClip = (chartStructure, chart) => {
    chartStructure.chartGroup
        .append("defs")
        .append("svg:clipPath")
        .attr("id", "clip" + chart.getId())
        .append("svg:rect")
        .attr("width", chart.getClientWidth() -
        chart.verticalAxis.offset.right -
        chart.verticalAxis.offset.left)
        .attr("height", chart.getClientHeight() -
        chart.horizontalAxis.offset.bottom -
        chart.horizontalAxis.offset.top)
        .attr("x", chart.verticalAxis.offset.left)
        .attr("y", chart.horizontalAxis.offset.top);
    chartStructure.linesGroup.attr("clip-path", "url(#clip" + chart.getId() + ")");
};
