import { DomainLinker } from "./domain-linker.js";

export class ChartBrush{

    private _domainLinker: DomainLinker;

    constructor(domainLinker: DomainLinker){
        this._domainLinker = domainLinker;
    }

    public get domainLinker(): DomainLinker {
        return this._domainLinker;
    }
}