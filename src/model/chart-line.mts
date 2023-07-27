import { Color } from "./color.js";

export class ChartLine{

    private data: number[][];
    private color: Color = "#000000"

    constructor(data: number[][]){
            this.data = data;
    }

    public setColor(color: Color){
        this.color = color;
    }

}