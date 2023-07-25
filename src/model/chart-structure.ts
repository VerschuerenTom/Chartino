export class ChartStructure{

    private svg: any;
    private chartGroup: any;

    constructor(svg: any){
        this.svg = svg;
    }

    public setChartGroup(chartGroup: any){
        this.chartGroup = chartGroup;
    }

    public getSvg(){
        return this.svg;
    }
}