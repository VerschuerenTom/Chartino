export const drawClip = (chartStructure, chart) => {
    chartStructure.chartGroup
        .append("defs")
        .append("svg:clipPath")
        .attr("id", "clip" + chart.getId())
        .append("svg:rect")
        .attr("width", chart.getClientWidth() - chart.offsets.right - chart.offsets.left)
        .attr("height", chart.getClientHeight() - chart.offsets.bottom - chart.offsets.top)
        .attr("x", chart.offsets.left)
        .attr("y", chart.offsets.top);
    chartStructure.linesGroup.attr("clip-path", "url(#clip" + chart.getId() + ")");
};
