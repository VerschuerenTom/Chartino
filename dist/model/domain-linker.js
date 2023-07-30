export class DomainLinker {
    constructor() {
        this.domainHistory = [];
    }
    pushDomain(domain) {
        this.domainHistory.push(domain);
    }
    popDomain(domain) {
        return this.domainHistory.pop();
    }
    resetDomains() {
        this.domainHistory.length = 1;
    }
    getFullDomain() {
        return this.domainHistory[0];
    }
}
