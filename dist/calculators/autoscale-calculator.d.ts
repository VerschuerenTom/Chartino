import { ChartLine } from "../index.mjs";
import { ChartStructure } from "../model/chart-structure.js";
export type AutoScaleData = {
    lineData: [Date, number][];
    data: number[];
    verticalDomain: number[];
    verticalScale: any;
} | null;
export declare const getAutoScaleData: (chartStructure: ChartStructure, line: ChartLine, domain: number[]) => AutoScaleData;
//# sourceMappingURL=autoscale-calculator.d.ts.map