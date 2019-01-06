### With default properties
```js
    const chartData = require('./Chart.fixtures.js').default;
    
    <ScatterPlot
        data={chartData.firstDataMethod()}
        shouldShowLoadingState={true}
    />
```

### With loading state
```js

    <ScatterPlot
        data={null}
        shouldShowLoadingState={true}
    />
```


See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: YourLinkToComponentAPIHere
[DataLink]: YourLinkToExampleDataInputHere