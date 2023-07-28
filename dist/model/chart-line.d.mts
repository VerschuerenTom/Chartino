import { Color } from "./color.js";
export declare class ChartLine {
    private _data;
    private color;
    private _timeDomain;
    private _verticalDomain;
    constructor(data: {
        [key: number]: number;
    });
    setColor(color: Color): void;
    get data(): {
        [key: number]: number;
    };
    set data(value: {
        [key: number]: number;
    });
    get timeDomain(): Date[] | undefined;
    get verticalDomain(): number[];
}
//# sourceMappingURL=chart-line.d.mts.map