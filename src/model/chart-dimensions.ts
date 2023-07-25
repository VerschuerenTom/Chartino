export type Margin = {top: number, right: number, bottom: number, left: number};

export class ChartDimensions {



    private margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    constructor(margin: Margin){
        this.margin = margin
    }

}