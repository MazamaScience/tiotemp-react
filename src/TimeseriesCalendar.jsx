import React, { useEffect, useRef, useState } from "react";
import * as help from "./helpers";
import {renderCalendar} from "./renderCalendar";
import * as defaults from "./defaultCallbacks";

/**
 * 
 * @param {*} props 
 * @returns 
 */
const TimeseriesCalendar = (props) => {

    const ref = useRef();

    const [state, setState] = useState({ ...props })

    useEffect(() => {
        renderCalendar(state, ref);
    }, [state]);

    return (
        <div ref={ref} />
    );

}

// Default React properties
TimeseriesCalendar.defaultProps = {
    data: [["2018/11/23 00:01"], ["2019/12/31 00:01"], ["2020/01/01 00:01", 1], ["2020/01/02 00:01", 3], ["2020/01/03 00:01", 6], ["2020/01/04 00:01", 16]],
    colors: ["#d8f06e", "#68d0ab", "#7ea3b4", "#9b81b7"],
    breaks: [2, 5, 10, 15],
    fullYear: false,
    showMonthText: true,
    showWeekdayText: true,
    showTooltip: true,
    cellPadding: 3,
    monthPadding: 20,
    cellSize: 30,
    cellRadius: 3,
    highlightStroke: 0,
    columns: 3,
    onClick: defaults.calendarOnclick,
    inCell: defaults.calendarInCell,
    highlight: defaults.calendarHighlight, 
    tooltip: defaults.calendarTooltip
};

export default TimeseriesCalendar;