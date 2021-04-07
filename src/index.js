import React from 'react';
import ReactDOM from 'react-dom';
import TiotempCalendar from './TiotempCalendar';
import reportWebVitals from './reportWebVitals';

var tempData = [
    ['2001-12-27 00:00 PST', 8.0],
    ['2001-12-28 00:00 PST', 28.0, 1, 1],
    ['2001-12-30 00:00 PST', 3.0],
    ['2001-12-31 00:00 PST', 44.0],
    ['2002-01-01 00:00 PST', 10.0],
    ['2002-01-01 01:00 PST', 12.0],
    ['2002-01-02 00:00 PST', 18.0],
    ['2002-01-03 00:00 PST', 8.0],
    ['2002-01-04 00:00 PST', 28.0],
    ['2002-01-05 00:00 PST', 3.0],
    ['2002-01-06 00:00 PST', 44.0],
    ['2002-01-07 00:00 PST', 11.0]
];

ReactDOM.render(
  <React.StrictMode>
    <TiotempCalendar data={[["2001-01-01 01:00 PST", 0]]}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
