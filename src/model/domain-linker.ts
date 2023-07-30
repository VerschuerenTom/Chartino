import { LineChart } from "./linechart.mjs"

export type Domain = [number, number] | Date[]

export class DomainLinker{

    private domainHistory: Domain[] = []

    constructor(){
    }

    public pushDomain(domain: Domain){
        this.domainHistory.push(domain)
    }

    public popDomain(domain: Domain){
        return this.domainHistory.pop()
    }

    public resetDomains(){
        this.domainHistory.length = 1
    }

    public getFullDomain(): Domain{
        return this.domainHistory[0]
    }

}