import * as d3 from "d3";

/**
 * 
 * @param {*} d 
 */
export const calendarHighlight = (d) => {
    d3.select(d.target)
        .style("opacity", 0.75);

    d3.select(d.target)
        .select("rect.day-fill")
        .style("stroke", "#605e5d")
        .style("stroke-width", 0);
}

/**
 * 
 * @param {*} d 
 */
export const calendarOnclick = (d) => {
    console.log(d);
}

/**
 * 
 * @param {*} d 
 * @returns 
 */
export const calendarTooltip = (d) => {
    let text = (d.mean ?? "No Data.");
    if (text !== "No Data.") {
        return d.date.toLocaleDateString() + "<br>" + Math.round(text * 100) / 100 + " (\u00B5g/m\u00B3)";
    } else {
        return d.date.toLocaleDateString() + "<br>" + text;
    }
}

/** Default Calendar day-cell text callback
 * 
 * @param {*} d An object containing a date object.
 * @returns 
 */
export const calendarInCell = (d) => {
    // console.log(new CalData())
    return d.date.getDate();
}

/** Default Color Mapping Function
 * 
 * @param {*} value A numermic value.
 * @param {*} colors An array of colors.
 * @param {*} breaks An array of color-breaks. 
 * @returns 
 */
export const calendarColorMap = (value, colors, breaks) => {
    // Remap the colors
    if (value === null) {
        return "#F4F4F4";
    } else {
        return d3.scaleThreshold()
            .domain(breaks)
            .range(colors)(value);
    }
}