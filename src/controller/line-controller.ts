import { ChartLine, LineChart } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
import * as d3 from "d3";

export const drawLines = (chartStructure: ChartStructure, chart:LineChart) => {
    if(chartStructure.chartGroup === undefined){
        return;
    }
    if(chartStructure.linesGroup === undefined){
        chartStructure.linesGroup = chartStructure.chartGroup.append("g")
    }
    chartStructure.linesGroup.selectAll("*").remove();

    const timeScale = chart.timeScale;
    const verticalScale = chart.verticalScale

    chart.getChartlines().forEach(chartLine => {
        drawLine(timeScale, verticalScale, chartStructure, chartLine);
    });

}

//TODO: Refactor this
function drawLine(timeScale: any, verticalScale: any, chartStructure: ChartStructure, chartLine: ChartLine) {

    if(chartLine.isAutoScale){
        const values = getFilteredData(chartLine, chartStructure.chart.timeDomain as Date[]);
        const verticalDomain = getVerticalDomain(values)
        const updatedVerticalScale = d3.scaleLinear()
        .domain(verticalDomain)
        .range([chartStructure.chart.horizontalAxis.offset.top,chartStructure.chart.getClientHeight() - chartStructure.chart.horizontalAxis.offset.bottom,0])
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
    }else{ 
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

const getVerticalDomain = (values: any): [number,number] =>{
    const domain =  d3.extent(Object.values(values)) as [string, string]
    return [parseInt(domain[0]), parseInt(domain[1])]
}
function getFilteredData(line: ChartLine, timeDomain:Date[]) {
    const startDate: number = timeDomain[0].getTime()
    const endDate: number = timeDomain[1].getTime()
    const filteredValues: any = {};
    line.dataEntries.forEach(([key, value]) => {
        const numberKey = parseInt(key);
        if (numberKey >= startDate && numberKey <= endDate && !isNaN(value)) {
            filteredValues[numberKey] = value;
        }

    });
    return filteredValues;
} 

