import { clearSvg, initChartStructure } from "./svg-controller.js";
export const drawLineChart = (lineChart) => {
    clearSvg(lineChart.getId());
    const chartStructure = initChartStructure(lineChart);
};
