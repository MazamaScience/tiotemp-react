# tiotemp-react

`tiotemp-react` is a collection of D3 React visualization components for temporal and spatial data.

## Getting Started


## Visualizations

### Timeseries Calendar

`timeseriesCalendar(options)` is a opinionated calendar heatmap built with D3.js.

#### Options

* url 

##### `timeseriesCalendar({url})`

_string_ The URL pointing to the CSV file. Remote or local should work.

* el 

##### `timeseriesCalendar({el})`

_string_ What element to append the svg-calendar-canvas to.

* callback 

##### `timeseriesCalendar({onclick})`

_function_ Allow user to input custom callback features for date-cell clicks. 

* colors

##### `timeseriesCalendar({color})`

_array (string)_ Specify the color palette for the calendar date-cells.

* breaks

##### `timeseriesCalendar({breaks})`

_array (numeric)_ Specify the color-breaks for the defined color palette. Note: must be same array length of the color palette. 

* fullYear

##### `timeseriesCalendar({fullYear})`

_boolean_ `true` or `false` to show the full calendar year (12 months), regardless of data provided. 

* cellSize 

##### `timeseriesCalendar({cellSize})`

_numeric_ The size of each date-cell. Numeric, in pixels.

* cellPadding

##### `timeseriesCalendar({cellSize})`

_numeric_ The size of each date-cell padding. Numeric, in pixels.

* cellRadius

##### `timeseriesCalendar({cellRadius})`

_numeric_ The size of each date-cell corner radius. For circles, `cellRadius = cellSize`.  Numeric, in pixels. 

* columns

##### `timeseriesCalendar({columns})`

_numeric_ The number of columns the calendar should display. `'auto-fill` for automatic columns based on window and month-cell widths. Numeric otherwise.

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
