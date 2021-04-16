import React, {useEffect, useRef, useState, createRef} from "react";
import * as tiotemp from "./renderCalendar"
import * as helper from "./helpers"



const TimeseriesCalendar = (props) => {
    
    const ref = useRef();

    const [calState, setCalState] = useState({...props})
    
    useEffect(() => {
        tiotemp.renderCalendar(calState, ref);
    }, [calState]);

    return (
        <div ref = {ref}/>
    );

}

// Default React properties
TimeseriesCalendar.defaultProps = {
        data: [["2018/11/23 00:01"], ["2019/12/31 00:01"], ["2020/01/01 00:01", 1], ["2020/01/02 00:01", 3], ["2020/01/03 00:01", 6], ["2020/01/04 00:01", 16]],
        colors: ["#d8f06e", "#68d0ab", "#7ea3b4", "#9b81b7"],
        breaks: [2, 5, 10, 15],
        fullYear: false,
        showMonths: undefined,
        cellPadding: 5,
        monthPadding: 10,
        cellSize: 26,
        cellRadius: 3,
        highlightStroke: 0,
        columns: 12,
        onClick: d => {console.log(d);},
        inCell: d => { return d.date.getDate();}, // allow custom cell stuff
        inTooltip: d => {
            if (typeof d.mean !== "undefined") {
                return d.date.toLocaleDateString() + "<br>" + d.mean + " " + "(\u00B5g/m\u00B3)";
            } else {
                return d.date.toLocaleDateString() + "<br> No data.";
            }
        }
};

export default TimeseriesCalendar;