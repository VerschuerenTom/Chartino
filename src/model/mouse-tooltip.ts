export type TooltipData = {value: number, color: string}[]

export class MouseTooltip{

    private _callback: (time:Date, pointData: TooltipData) => string
    private _positionCallback: (x: number, y: number) => {x:number, y:number} = (x,y) => ({x: x+10,y: y+10});

    constructor(callback: (time:Date, pointData: TooltipData) => string ){
        this._callback = callback;
    }

    public get callback():  (time:Date, pointData: TooltipData) => string{
        return this._callback
    }

    public get positionCallback(): (x: number, y: number) => {x:number, y:number} {
        return this._positionCallback;
    }
    public set positionCallback(value: (x: number, y: number) => {x:number, y:number}) {
        this._positionCallback = value;
    }
}