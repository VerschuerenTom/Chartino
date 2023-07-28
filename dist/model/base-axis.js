export class BaseAxis {
    constructor() {
        this.offset = { top: 50, bottom: 50, left: 50, right: 50 };
    }
    setOffset(offset) {
        this.offset = offset;
        ;
    }
    getOffset() {
        return this.offset;
    }
}
;
