export type Domain = [number, number] | Date[];
export declare class DomainLinker {
    private domainHistory;
    constructor();
    pushDomain(domain: Domain): void;
    popDomain(domain: Domain): Domain | undefined;
    resetDomains(): void;
    getFullDomain(): Domain;
}
//# sourceMappingURL=domain-linker.d.ts.map