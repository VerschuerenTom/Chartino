export class Tooltip{

    private _callback: (time:Date, pointData: {value: number, color: string}[]) => string

    constructor(callback: (time:Date, pointData: {value: number, color: string}[]) => string ){
        this._callback = callback;
    }

    public get callback():  (time:Date, pointData: {value: number, color: string}[]) => string{
        return this._callback
    }


}