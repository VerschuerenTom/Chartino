export class BaseAxis {
    private _isEnabled: boolean = true;

    public get isEnabled(): boolean {
        return this._isEnabled;
    }
    public set isEnabled(value: boolean) {
        this._isEnabled = value;
    }
}
