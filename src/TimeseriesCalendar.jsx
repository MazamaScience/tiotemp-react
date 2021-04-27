import React, { useEffect, useRef, useState } from "react";
import { renderCalendar } from "./renderCalendar";
import * as defaults from "./defaultCallbacks";

/**
 * 
 * @param {*} props A React `props` object.
 * @returns HTML div
 */
const TimeseriesCalendar = React.forwardRef((props, ref) => {

    // Check for params 
    if (!ref) {
        throw new Error("TimeseriesCalendar requires a ref object! See React.useRef() for details.");
    }
    if (!props.data) {
        throw new Error("TimeseriesCalendar requires data.");
    }

    // Copy the readonly props 
    const state = { ...props };

    // Render the calendar on state updates 
    useEffect(() => {
        renderCalendar(state, ref);
    }, [state]);

    return (
        <div ref={ref} />
    );
})

// Default React properties
TimeseriesCalendar.defaultProps = {
    data: [["2018/11/23 00:01"], ["2019/12/31 00:01"], ["2020/01/01 00:01", 1], ["2020/01/02 00:01", 3], ["2020/01/03 00:01", 6], ["2020/01/04 00:01", 16]],
    colors: ["#d8f06e", "#68d0ab", "#7ea3b4", "#9b81b7"],
    breaks: [2, 5, 10, 15],
    fullYear: false,
    showMonthText: true,
    showWeekdayText: true,
    showTooltip: true,
    cellSize: 30,
    cellRadius: 3,
    cellPadding: 3,
    monthPadding: 20,
    columns: 3,
    onCellClick: defaults.calendarOnclick,
    inCell: defaults.calendarInCell,
    tooltip: defaults.calendarTooltip,
    highlight: defaults.calendarHighlight,
    colorMap: defaults.calendarColorMap,
};

export default TimeseriesCalendar;