# Chartino

> :warning: **This repository is under construction**: This repository is being build and therefore is at this point in time incomplete and lacks proper testing.

## Documentation

This is library is an ES module, not a CommonJS one.

### Installation

```sh
npm i chartino
```

### Examples

Creating a simple linechart with one line in typescript can be done as follows:

```typescript
import { ChartLine, LineChart } from "chartino";

//data object where the keys are timestamps in milliseconds.
const dataOne = {
    1672502400000: 5, // September 1, 2023
    1672588800000: 10, // September 2, 2023
    1672675200000: 13, // September 3, 2023
    1672761600000: 9, // September 4, 2023
    1672848000000: 4, // September 5, 2023
};

const dataTwo = {
    1672502400000: -15, // September 1, 2023
    1672588800000: 8, // September 2, 2023
    1672675200000: 6, // September 3, 2023
    1672761600000: -7, // September 4, 2023
    1672848000000: 20, // September 5, 2023
};

const lineChart = new LineChart("chart"); // "chart" points to a div with chart as id.
const chartLineOne: ChartLine = new ChartLine(dataOne);
const chartLineTwo: ChartLine = new ChartLine(dataTwo);
chartLineOne.color = "#FF0000"; //color red
chartLineTwo.color = "#008000"; //color green

lineChart.addChartLine(chartLineOne).addChartLine(chartLineTwo).draw();
```

The corresponding html will be as follows:

```html
<div id="chart"></div>
```
