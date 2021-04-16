import React from 'react';
import ReactDOM from 'react-dom';
import TimeseriesCalendar from './TimeseriesCalendar';

// Test data
function genTestData() {
  var i = 1;
  var arr = [];
  while (i < 132) {
    var d = new Date((new Date("2021-01-01 0:01")).setDate(i));
    var v = Math.random() * 30;
    ++i;
    arr.push([d, v]);
  }
  return arr;
}

var arr1 = genTestData();
var arr2 = genTestData();
var arr3 = genTestData();

const datas = [arr1, arr2, arr3]

ReactDOM.render(
  <React.StrictMode>
    {
      datas.map((d, i) => {
        return (
          <TimeseriesCalendar data={d} key={i} cellRadius = {20} cellSize = {40} />
        )
      })
    }
  </React.StrictMode>,
  document.getElementById('root')
);

