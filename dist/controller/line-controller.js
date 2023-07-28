import * as d3 from "d3";
export const drawLines = (chartStructure, chart) => {
    if (chartStructure.linesGroup === undefined) {
        chartStructure.linesGroup = chartStructure.chartGroup.append("g");
    }
    chartStructure.linesGroup.selectAll("*").remove();
    const lines = chart.getChartlines();
    const timeScale = chart.timeScale;
    const verticalScale = chart.verticalScale;
    lines.forEach(chartLine => {
        const line = d3.line()
            //.defined((d) => !isNaN(d[1]))
            .x((d, i) => {
            return timeScale(d[0]);
        })
            .y(function (d) {
            console.log(verticalScale(d[1]));
            return verticalScale(d[1]);
        })
            .curve(d3.curveLinear);
        console.log(line);
        const lineGroup = chartStructure.linesGroup
            .append("path")
            .attr("fill", "none")
            .datum(chartLine.dataEntries)
            .attr("d", line)
            .attr("stroke", chartLine.color);
    });
};
