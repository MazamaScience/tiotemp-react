# tiotemp-react

`tiotemp-react` is a collection of D3 React visualization components for temporal and spatial data.

## Getting Started

## Timeseries Calendar

`TimeseriesCalendar.js` is an opinionated React and D3 calendar heatmap visualization.

### Usage

The `TimeseriesCalendar` React component has a number of customization properties accessed via React's `prop` feature. 

|prop|Description| 
| - | - |
|`data`| _array_ An array containing timeseries entries of the following format: `[[Date1, Value1], [Date2, Value2], ...]`. Note: the _date_ index column must always preceed the values.e|
|`colorMap`|_function_ Callback to allow the user to specify a color mapping function.|
|`colors`| _array (string)_ Specify `N` colors for the palette of the calendar date-cells. Ignored if `colorMap` is provided.|
|`breaks`| _array (numeric)_ Specify `N` color-breaks for the defined color palette of length `N`. Ignored if `colorMap` is provided.|
|`fullYear`| _boolean_ `true` or `false` to show the full calendar year (12 months), regardless of dataset's date range.|
|`columns`| _numeric_ The number of columns the calendar should display. `'auto-fill` for automatic columns based on window and month-cell widths. Numeric otherwise. | 
|`showMonthText`| _boolean_ Show the month label for each month-cell.|
|`showWeekDayText`| _boolean_ Show the weekday label for each day of the week. |
|`showTooltip`| _boolean_ Show the tooltip on day-cell mouseover. |
|`tooltip`| _function_ Callback to allow user to specify the tooltip contents. |
|`inCell`|_function_ Callback to allow user to specify the text day-cell value.|
|`cellSize`| _numeric_ The size of each date-cell. Numeric, in pixels. |
|`cellRadius`| _numeric_ The size of each date-cell corner radius. For circles, `cellRadius = cellSize`.  Numeric, in pixels. |
|`cellPadding`| _numeric_ The size of each date-cell padding. Numeric, in pixels. |
|`onCellClick`| _function_ Callback to allow user to input custom callback features for date-cell mouse clicks.| 
|`highlight`|_function_ Callback to allow user to specify the mouseover highlighting. |

### Example Usage

```js
// ...

// Create example data
var tempData = [
    ['2002-01-01 00:00 PST', 10.0],
    ['2002-01-02 00:00 PST', 18.0],
    ['2002-01-03 00:00 PST', 8.0],
    ['2002-01-04 00:00 PST', 28.0],
    ['2002-01-05 00:00 PST', 3.0],
    ['2002-01-06 00:00 PST', 44.0],
    ['2002-01-07 00:00 PST', 11.0]
];

// Render the component using the data property parameter
ReactDOM.render(
  <React.StrictMode>
    <TimeseriesCalendar data = {tempData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// ...
```

### Further Customization

The `TimeseriesCalendar` component has a variety of default callback functions built-in. To get a good sense of how to write and extend the `TimeseriesCalendar`'s callbacks, see [`defaultCallbacks.js`](src/defaultCallbacks.js). 

## Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
