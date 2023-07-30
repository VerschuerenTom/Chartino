export class ChartBrush {
    constructor(domainLinker) {
        this._domainLinker = domainLinker;
    }
    get domainLinker() {
        return this._domainLinker;
    }
}
