export class DomainLinker {
    constructor() {
        this.domainHistory = [];
        this.domainFuture = [];
        this.subscribers = [];
    }
    pushDomain(domain, resetFutures = true) {
        if (resetFutures) {
            this.domainFuture.length = 0;
        }
        this.domainHistory.push(domain);
        this.subscribers.forEach((subscriber) => subscriber(domain));
    }
    popDomain() {
        if (this.domainHistory.length > 1) {
            const poppedDomain = this.domainHistory.pop();
            this.domainFuture.push(poppedDomain);
            const domain = this.domainHistory.at(-1);
            this.subscribers.forEach((subscriber) => subscriber(domain));
            return domain;
        }
        else {
            return this.domainHistory[0];
        }
    }
    unpopDomain() {
        if (this.domainFuture.length > 0) {
            const newDomain = this.domainFuture.pop();
            this.pushDomain(newDomain, false);
            return newDomain;
        }
        else {
            throw new Error("No future domains found!");
        }
    }
    hasDomainHistory() {
        return this.domainHistory.length > 1;
    }
    hasDomainFutures() {
        return this.domainFuture.length > 0;
    }
    resetDomains() {
        this.domainHistory.length = 1;
    }
    setFullDomain(domain) {
        this.domainHistory[0] = domain;
    }
    getFullDomain() {
        return this.domainHistory[0];
    }
    subscribe(subscriber) {
        this.subscribers = [...this.subscribers, subscriber];
    }
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    }
}
