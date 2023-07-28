type Margin = {top:number, bottom:number, right:number, left:number};


export class BaseAxis{


    offset: Margin = {top: 50, bottom:50, left: 50, right: 50}
    

    constructor(){

    }

    public setOffset(offset: Margin): void{
        this.offset = offset;;
    }

    public getOffset():Margin{
        return this.offset;
    }
};