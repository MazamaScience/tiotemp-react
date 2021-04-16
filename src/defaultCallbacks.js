import * as d3 from "d3";

export const calendarHighlight = (d) => {
        d3.select(d.target)
            .style("opacity", 0.75);

        d3.select(d.target)
            .select("rect.day-fill")
            .style("stroke", "#605e5d")
            .style("stroke-width", 1);
}

export const calendarOnclick = (d) => {
    console.log(d);
}

