export type Domain = number[];
export type DomainSubscriber = (domain: Domain) => void;

export class DomainLinker {
    private domainHistory: Domain[] = [];
    private domainFuture: Domain[] = [];
    private subscribers: DomainSubscriber[] = [];

    constructor() {}

    public pushDomain(domain: Domain, resetFutures = true) {
        if (resetFutures) {
            this.domainFuture.length = 0;
        }
        this.domainHistory.push(domain);
        this.subscribers.forEach((subscriber) => subscriber(domain));
    }

    public popDomain(): Domain {
        if (this.domainHistory.length > 1) {
            const poppedDomain = this.domainHistory.pop() as Domain;
            this.domainFuture.push(poppedDomain);
            const domain = this.domainHistory.at(-1) as Domain;
            this.subscribers.forEach((subscriber) => subscriber(domain));
            return domain;
        } else {
            return this.domainHistory[0];
        }
    }

    public unpopDomain(): Domain {
        if (this.domainFuture.length > 0) {
            const newDomain = this.domainFuture.pop() as Domain;
            this.pushDomain(newDomain, false);
            return newDomain;
        } else {
            throw new Error("No future domains found!");
        }
    }

    public hasDomainHistory(): boolean {
        return this.domainHistory.length > 1;
    }

    public hasDomainFutures(): boolean {
        return this.domainFuture.length > 0;
    }

    public resetDomains() {
        this.domainHistory.length = 1;
    }

    public setFullDomain(domain: Domain) {
        this.domainHistory[0] = domain;
    }

    public getFullDomain(): Domain {
        return this.domainHistory[0];
    }

    public subscribe(subscriber: DomainSubscriber) {
        this.subscribers = [...this.subscribers, subscriber];
    }

    public unsubscribe(subscriber: DomainSubscriber) {
        this.subscribers = this.subscribers.filter((sub) => sub !== subscriber);
    }
}
