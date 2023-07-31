import * as d3 from "d3";
export const drawLines = (chartStructure, chart) => {
    if (chartStructure.chartGroup === undefined) {
        return;
    }
    if (chartStructure.linesGroup === undefined) {
        chartStructure.linesGroup = chartStructure.chartGroup.append("g");
    }
    chartStructure.linesGroup.selectAll("*").remove();
    const timeScale = chart.timeScale;
    const verticalScale = chart.verticalScale;
    chart.getChartlines().forEach(chartLine => {
        drawLine(timeScale, verticalScale, chartStructure, chartLine);
    });
};
//TODO: Refactor this
function drawLine(timeScale, verticalScale, chartStructure, chartLine) {
    if (chartLine.isAutoScale) {
        const values = getFilteredData(chartLine, chartStructure.chart.timeDomain);
        const verticalDomain = getVerticalDomain(values);
        const updatedVerticalScale = d3.scaleLinear()
            .domain(verticalDomain)
            .range([chartStructure.chart.horizontalAxis.offset.top, chartStructure.chart.getClientHeight() - chartStructure.chart.horizontalAxis.offset.bottom, 0]);
        const line = d3.line()
            .defined((d) => !isNaN(d[1]))
            .x((d) => {
            return timeScale(d[0]);
        })
            .y(function (d) {
            return updatedVerticalScale(d[1]);
        })
            .curve(d3.curveLinear);
        chartStructure.linesGroup
            .append("path")
            .attr("fill", "none")
            .datum(chartLine.dataEntries)
            .attr("d", line)
            .attr("stroke", chartLine.color);
    }
    else {
        const line = d3.line()
            .defined((d) => !isNaN(d[1]))
            .x((d) => {
            return timeScale(d[0]);
        })
            .y(function (d) {
            return verticalScale(d[1]);
        })
            .curve(d3.curveLinear);
        chartStructure.linesGroup
            .append("path")
            .attr("fill", "none")
            .datum(chartLine.dataEntries)
            .attr("d", line)
            .attr("stroke", chartLine.color);
    }
}
const getVerticalDomain = (values) => {
    const domain = d3.extent(Object.values(values));
    return [parseInt(domain[0]), parseInt(domain[1])];
};
function getFilteredData(line, timeDomain) {
    const startDate = timeDomain[0].getTime();
    const endDate = timeDomain[1].getTime();
    const filteredValues = {};
    line.dataEntries.forEach(([key, value]) => {
        const numberKey = parseInt(key);
        if (numberKey >= startDate && numberKey <= endDate && !isNaN(value)) {
            filteredValues[numberKey] = value;
        }
    });
    return filteredValues;
}
