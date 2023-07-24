import { Color } from "./color";

export class ChartLine{

    private data: [Date, number];
    private color: Color = "#000000"

    constructor(data: [Date, number]){
            this.data = data;
    }
}