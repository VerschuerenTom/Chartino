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
const data = {
  1690480793129: 10,
  1690480809279: 15,
  1690480817543: 11,
  1690565305827: 25,
  1690565814314: 11,
  1690566964240: 25,
};

const lineChart = new LineChart("chart"); //"chart" points to a div with chart as id.
const chartLine: ChartLine = new ChartLine(data);

chartLine.color = "#FF0000";

lineChart.addChartLine(chartLine);
lineChart.draw();
```

The corresponding html will be as follows:

```html
<div id="chart"></div>
```
