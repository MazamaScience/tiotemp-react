import React from 'react';
import ReactDOM from 'react-dom';
import TimeseriesCalendar from './TimeseriesCalendar';

// Test data
// function genTestData () {
//   var i = 0;
//   var arr = [];
//   while (i < 365) {
//     var d = new Date((new Date("2021-01-01 08:01")).setDate(i));
//     var  v = Math.random() * 30;
//     ++i;
//     arr.push([d, v]); 
//   }
//   return arr;
// }

// var arr1 = genTestData(); 
// var arr2 = genTestData();
// var arr3 = genTestData();

const datas = [[["2018/11/23 00:01", 1]], [["2019/11/24 00:01", 20]] ,[["2020/11/25 00:01", 300]]]
//const cals = 

// console.log(cals)
ReactDOM.render(
  <React.StrictMode>
    {datas.map((d, i) => {
  return (
  <TimeseriesCalendar data = {d} key = {i}/>
  )})}
  </React.StrictMode>,
  document.getElementById('root')
);

