export type Domain = [number, number] | Date[];
export type DomainSubscriber = (domain: Domain) => void;
export declare class DomainLinker {
    private domainHistory;
    private domainFuture;
    private subscribers;
    constructor();
    pushDomain(domain: Domain, resetFutures?: boolean): void;
    popDomain(): Domain;
    unpopDomain(): Domain;
    hasDomainHistory(): boolean;
    hasDomainFutures(): boolean;
    resetDomains(): void;
    setFullDomain(domain: Domain): void;
    getFullDomain(): Domain;
    subscribe(subscriber: DomainSubscriber): void;
    unsubscribe(subscriber: DomainSubscriber): void;
}
//# sourceMappingURL=domain-linker.d.ts.map