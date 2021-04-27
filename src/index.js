import React from 'react';
import ReactDOM from 'react-dom';
import TimeseriesCalendar from './TimeseriesCalendar';

// Test data generation function.
const generateTestData = () => {
  var i = 1;
  var arr = [];
  while (i < 366) {
    var d = new Date((new Date("2021-01-01 0:01")).setDate(i));
    var v = Math.random() * 15;
    ++i;
    arr.push([d, v]);
  }
  return arr;
}

// Example Usage
const ExampleTimeseriesCalendar = (props) => {

  // Create a new reference
  let ref = React.useRef();

  // init the state data
  var [data, setData] = React.useState(generateTestData);

  // Handle click to generate and set new data. 
  let handleClick = () => {
    setData(generateTestData);
  };

  return (
    <div>
      <a href="#" onClick={handleClick}>
        Generate New Data
      </a>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 1 }}>
        <TimeseriesCalendar data={data} ref={ref} />
      </div>
    </div>
  );

}

ReactDOM.render(
  <ExampleTimeseriesCalendar />,
  document.getElementById('root')
);


