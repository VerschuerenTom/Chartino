export class BaseChart {

    private id;

    constructor(id: string){
        this.id = id;
    }

    public getClientHeight(): number{
        return this.getElement().clientHeight;
    }

    public getClientWidth(): number{
        return this.getElement().clientWidth
    }

    private getElement() {
        const el = document.getElementById(this.id);
        if (el == undefined) {
            throw new Error("Element with id " + this.id + "not found");
        }
        return el;
    }

    public getId(): string{
        return this.id;
    }
}