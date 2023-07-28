import { clearSvg, initChartStructure } from "./svg-controller.js";
import { drawAxes } from "./axis-controller.js";
import { drawLines } from "./line-controller.js";
export const drawLineChart = (lineChart) => {
    clearSvg(lineChart.getId());
    const chartStructure = initChartStructure(lineChart);
    const chartlines = lineChart.getChartlines();
    //TODO: fix for when we have multiple lines
    lineChart.timeDomain = chartlines[0].timeDomain;
    lineChart.verticalDomain = chartlines[0].verticalDomain;
    drawAxes(chartStructure, lineChart);
    drawLines(chartStructure, lineChart);
};
