import * as d3 from 'd3';
import * as help from "./helpers";

const createCanvas = (props, ref) => {
    let h = 5 * (props.cellSize + props.cellPadding) + 2 * props.monthPadding;
    let w = 7 * (props.cellSize + props.cellPadding) + 2 * props.monthPadding;

    let canvas = d3.select(ref.current)
        .append("div")
        .attr("class", "grid-container")
        .style("display", "grid")
        .style("grid-template-columns", `repeat(${props.columns}, minmax(${w}px, ${h}px))`)
        .style("grid-template-rows", "auto auto auto")
        .style("justify-self", "center")
        .selectAll("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("style", "background-color:white")
        .classed("svg-content", true);

    return canvas;


}

const drawMonths = (props, canvas) => {

    let monthly = help.getMonthly(props);
    let months = canvas
        .data(monthly)
        .enter()
        .append("svg")
        .attr("class", "month-cell")
        .attr("width", help.monthCellDim(props))
        .attr("height", help.monthCellDim(props))
        .style("padding", props.monthPadding);

    // Add the title of each svg month
    months
        .append("text")
        .attr("class", "month-label")
        .attr("x", 0.5 * help.monthCellDim(props))
        .attr("y", 0.0435 * help.monthCellDim(props))
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 0.5 * props.cellSize)
        .attr("cursor", "default")
        .text(d => {
            return d3.timeFormat("%B")(d);
        });

    // Add a title attribute to the calendar titles
    months
        .append("svg:title")
        .text(d => {
            return d3.timeFormat("%B %Y")(d);
        });

    // Add the weekday text below title (mon, tues, etc)
    months
        .selectAll("g.rect.day")
        .data((d, i) => {
            return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth() + 1, 1));
        })
        .enter()
        .append("text")
        .attr("class", "weekday-text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 0.33 * props.cellSize)
        .attr("width", props.cellSize)
        .attr("height", props.cellSize)
        .attr("cursor", "default")
        .attr("x", (d, i) => {
            if (i < 7) {
                return help.dayCellX(props, d) + props.cellSize * 0.5;
            }
        })
        .attr("y", props.cellSize)
        .text((d, i) => {
            if (i < 7) {
                return d3.timeFormat("%a")(d);
            }
        })

    return months;
}

const drawDays = (props, months) => {

    // Add the g layer to each day to append rect and text to
    let days = months
        .selectAll("g.day")
        .data((d, i) => {
            return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth() + 1, 1));
        })
        .enter()
        .append("g")
        .attr("class", "day");

    // Add the default color fill
    days
        .append("rect")
        .attr("class", "day-fill")
        .attr("width", props.cellSize)
        .attr("height", props.cellSize)
        .attr("rx", props.cellRadius) // round
        .attr("ry", props.cellRadius) // corners
        .attr("fill", "#F4F4F4") // Default colors
        .style("opacity", 1)
        .attr("x", d => {
            return help.dayCellX(props, d);
        })
        .attr("y", d => {
            return help.dayCellY(props, d);
        })
        .attr("date", d => {
            return d;
        });
    //Add the day text to each cell
    days
        .append("text")
        .attr("x", d => {
            return help.dayCellX(props, d) + props.cellSize * 0.5;
        })
        .attr("y", d => {
            return help.dayCellY(props, d) + (props.cellSize * 0.5 + props.cellSize * 0.3 / 2);
        })
        .attr("class", "day-text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", props.cellSize * 0.45)
        .style("opacity", 0.8)
        .html(d => {
            return props.inCell(help.dateDataFilter(props, d))
        })
        .attr("cursor", "default");

    return days;
    console.log({ months });
}

const fillDays = (props, days) => {
    // Fill day cell colors from daily mean
    days
        .selectAll("rect.day-fill")
        .transition()
        .duration(500)
        .attr("fill", (d, i) => {
            let fill = props.parsed.filter(h => {
                return d3.timeFormat("%Y-%m-%d")(h.date) === d3.timeFormat("%Y-%m-%d")(d);
            })[0];

            if (typeof fill !== 'undefined') {
                return fill.color;
            } else {
                return "#F4F4F4";
            }
        });
}

export const renderCalendar = (props, ref) => {

    props.parsed = help.prepData(props);

    let canvas = createCanvas(props, ref);
    let months = drawMonths(props, canvas);
    let days = drawDays(props, months);

    fillDays(props, days);
}