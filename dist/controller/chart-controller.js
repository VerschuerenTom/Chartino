import { clearSvg, initChartStructure } from "./svg-controller.js";
import { drawAxes } from "./axis-controller.js";
import { drawLines } from "./line-controller.js";
import { drawTooltip } from "./tooltip-controller.js";
import { drawBrush } from "./brush-controller.mjs";
export const drawLineChart = (lineChart) => {
    clearSvg(lineChart.getId());
    const chartStructure = initChartStructure(lineChart);
    const chartlines = lineChart.getChartlines();
    calculateDomains();
    drawAxes(chartStructure, lineChart);
    drawLines(chartStructure, lineChart);
    drawTooltip(chartStructure, lineChart);
    drawBrush(chartStructure, lineChart);
    function calculateDomains() {
        lineChart.timeDomain = chartlines.map(line => line.timeDomain).reduce((a, b) => {
            const minDate = a[0] < b[0] ? a[0] : b[0];
            const maxDate = a[1] > b[1] ? a[1] : b[1];
            return [minDate, maxDate];
        });
        lineChart.verticalDomain = chartlines.map(line => line.verticalDomain).reduce((a, b) => {
            return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
        });
    }
};
