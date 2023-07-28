import { BaseAxis } from "./base-axis.js";

type Margin = {top:number, bottom:number, right:number, left:number};


export class HorizontalAxis extends BaseAxis{

};

export const defaultHorizontalAxis = new HorizontalAxis();