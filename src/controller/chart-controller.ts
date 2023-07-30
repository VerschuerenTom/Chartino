import { LineChart } from "../model/linechart.mjs"
import { clearSvg, initChartStructure } from "./svg-controller.js";
import { ChartStructure } from "../model/chart-structure.js";
import { drawAxes } from "./axis-controller.js";
import { ChartLine } from "../model/chart-line.mjs";
import { drawLines } from "./line-controller.js";
import { drawTooltip } from "./tooltip-controller.js";
import { drawBrush } from "./brush-controller.mjs";
import { drawZoomBrush } from "./zoom-brush-controller.mjs";
import { drawClip } from "./clip-controller.js";


const chartStructures: ChartStructure[] = []

export const drawLineChart = (lineChart: LineChart) => {
  if(isAlreadyInitialized(lineChart.getId())){
    return;
  }
    clearSvg(lineChart.getId());
    const chartStructure: ChartStructure = initChartStructure(lineChart);
    chartStructures.push(chartStructure)
    const chartlines: ChartLine[] = lineChart.getChartlines()
    calculateDomains();

    drawAxes(chartStructure, lineChart)
    drawLines(chartStructure, lineChart)
    drawTooltip(chartStructure, lineChart)
    drawBrush(chartStructure, lineChart);
    drawZoomBrush(chartStructure, lineChart)
    drawClip(chartStructure, lineChart)
    

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
}

const isAlreadyInitialized = (id:string): boolean => {
  return chartStructures.map(structure => structure.chart.getId()).includes(id)
}




