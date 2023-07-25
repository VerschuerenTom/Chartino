"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chart_line_1 = require("../src/model/chart-line");
const linechart_1 = require("../src/model/linechart");
const linechart = new linechart_1.LineChart("id", "chart");
const data = [[1690310054224, 41], [1690310119501, 6], [1690310131060, 7]];
const chartLine = new chart_line_1.ChartLine(data);
linechart.addChartLine(chartLine).draw();
