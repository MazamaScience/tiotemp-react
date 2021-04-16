import * as d3 from "d3";

export const calendarHighlight = (d) => {

    d3.select(d.target)
        .style("opacity", 0.75);

    d3.select(d.target)
        .select("rect.day-fill")
        .style("stroke", "#605e5d")
        .style("stroke-width", 0);
}

export const calendarOnclick = (d) => {
    console.log(d);
}

export const calendarTooltip = (d) => {
    let text = (d.mean ?? "No Data.");
    if (text !== "No Data.") {
        return d.date.toLocaleDateString() + "<br>" + Math.round(text * 100) / 100 + " (\u00B5g/m\u00B3)";
    } else {
        return d.date.toLocaleDateString() + "<br>" + text;
    }
}

export const calendarInCell = (d) => {
    return d.date.getDate();
}