# Chartino

> :warning: **This repository is under construction**: This repository is being build and therefore is at this point in time incomplete and lacks proper testing.

## Documentation

This is library is an ES module, not a CommonJS one.

### Installation

```sh
npm i chartino
```

### Examples
#### Basic line chart

Creating a simple linechart with one line in typescript can be done as follows:

```typescript
import { ChartLine, LineChart } from "chartino";

//data object where the keys are timestamps in milliseconds.
const data = {
    1672502400000: 5, // September 1, 2023
    1672588800000: 10, // September 2, 2023
    1672675200000: 13, // September 3, 2023
    1672761600000: 9, // September 4, 2023
    1672848000000: 4, // September 5, 2023
};

const lineChart = new LineChart("chart"); // "chart" points to a div with chart as id.
const chartLine: ChartLine = new ChartLine(data);
chartLineTwo.color = "#008000"; //color green

lineChart
    .addChartLine(chartLine)
    .draw();
```

The corresponding html will be as follows:

```html
<div id="chart"></div>
```

#### Chart with multiple lines

Adding a more than one lines is possible. This can be done as follows:
```typescript
const chartLine = new ChartLine(data);
const anotherChartLine = new ChartLine(data);

lineChart
    .addChartLine(chartLine)
    .draw()
```

#### Chart with a mouse tooltip

This library allows you to configure a custom mouse tooltip. Create a new object from the class MouseTooltip and pass in a function as argument.
This function should return a string which represents the html code for the tooltip.
```typescript
class MouseTooltip(callback: ((time: Date, tooltipData: TooltipData) => string))
```
Example: 
```typescript
const getTooltipHtml = (time: Date, tooltipData: {value: number, color: string}[]) => {
    return "<div><p>" + time.toString() +": " + tooltipData[0].value + "</p></div>";
}

//new MouseTooltip
const tooltip = new MouseTooltip(getTooltipHtml)
//position the tooltip 10 pixel to the bottom and 10 pixels to the top of the mouse.
tooltip.positionCallback = (x:number,y:number) => ({x: x +10, y: y +10})
lineChart
    .setTooltip(tooltip)
    .draw()
```
