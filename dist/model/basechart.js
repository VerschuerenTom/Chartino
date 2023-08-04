export class BaseChart {
    constructor(id) {
        this.id = id;
    }
    getClientHeight() {
        return this.getElement().clientHeight;
    }
    getClientWidth() {
        return window.innerWidth;
    }
    getElement() {
        const el = document.getElementById(this.id);
        if (el == undefined) {
            throw new Error("Element with id " + this.id + " not found");
        }
        return el;
    }
    getId() {
        return this.id;
    }
}
