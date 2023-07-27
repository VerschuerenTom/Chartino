export class ChartStructure {
    constructor(svg) {
        this.svg = svg;
    }
    setChartGroup(chartGroup) {
        this.chartGroup = chartGroup;
    }
    getSvg() {
        return this.svg;
    }
}
