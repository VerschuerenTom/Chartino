export class BaseChart {

    private chartRef;
    private id;

    constructor(id: string, chartRef: any){
        this.id = id;
        this.chartRef = chartRef
    }

    public getChartRef(){
        return this.chartRef;
    }

}