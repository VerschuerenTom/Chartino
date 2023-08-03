import { ChartStructure } from "../model/chart-structure.js";

export const drawAxisTooltip = (structure: ChartStructure) => {
    structure.chartGroup.append("g").style("pointer-events", "none");
};
