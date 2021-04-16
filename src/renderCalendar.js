import * as d3 from 'd3';
import * as help from "./helpers";

/** Create the canvas SVG
 * 
 * @param {*} state A React-props object.  
 * @param {*} ref A React reference object.
 * @returns SVG
 */
const createSandbox = (state, ref) => {
    let h = 5 * (state.cellSize + state.cellPadding) + 2 * state.monthPadding;
    let w = 7 * (state.cellSize + state.cellPadding) + 2 * state.monthPadding;

    let sandbox = d3.select(ref.current)
        .append("div")
        .attr("class", "grid-container")
        .style("display", "grid")
        .style("grid-template-columns", `repeat(${state.columns}, minmax(${w}px, ${h}px))`)
        .style("grid-template-rows", "auto auto auto")
        .style("justify-self", "center")
        .selectAll("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("style", "background-color:white")
        .classed("svg-content", true);

    return sandbox;
}

/**
 * 
 * @param {*} state 
 * @param {*} sandbox
 * @returns 
 */
const drawMonths = (state, sandbox) => {

    let monthly = help.getMonthly(state);
    let months = sandbox
        .data(monthly)
        .enter()
        .append("svg")
        .attr("class", "month-cell")
        .attr("width", help.monthCellDim(state))
        .attr("height", help.monthCellDim(state))
        .style("padding", state.monthPadding);

    // Add the title of each svg month
    months
        .append("text")
        .attr("class", "month-label")
        .attr("x", 0.5 * help.monthCellDim(state))
        .attr("y", 0.05 * help.monthCellDim(state))
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 0.5 * (state.cellSize + state.cellPadding))
        .attr("cursor", "default")
        .text(d => {
            return d3.timeFormat("%B")(d);
        });

    // Add a title attribute to the calendar titles
    months
        .selectAll("text.month-label")
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
        .attr("font-size", 0.33 * state.cellSize)
        .attr("width", state.cellSize)
        .attr("height", state.cellSize)
        .attr("cursor", "default")
        .attr("x", (d, i) => {
            if (i < 7) {
                return help.dayCellX(state, d) + state.cellSize * 0.5;
            }
        })
        .attr("y", state.cellSize + state.cellPadding - 0.2 * state.cellSize)
        .text((d, i) => {
            if (i < 7) {
                return d3.timeFormat("%a")(d);
            }
        });

    return months;
}

/**
 * 
 * @param {*} state 
 * @param {*} months 
 * @returns 
 */
const drawDays = (state, months) => {

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
        .attr("width", state.cellSize)
        .attr("height", state.cellSize)
        .attr("rx", state.cellRadius) // round
        .attr("ry", state.cellRadius) // corners
        .attr("fill", "#F4F4F4") // Default colors
        .style("opacity", 1)
        .attr("x", d => {
            return help.dayCellX(state, d);
        })
        .attr("y", d => {
            return help.dayCellY(state, d);
        })
        .attr("date", d => {
            return d;
        });

    //Add the day text to each cell
    days
        .append("text")
        .attr("x", d => {
            return help.dayCellX(state, d) + state.cellSize * 0.5;
        })
        .attr("y", d => {
            return help.dayCellY(state, d) + (state.cellSize * 0.5 + state.cellSize * 0.3 / 2);
        })
        .attr("class", "day-text")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", state.cellSize * 0.45)
        .style("opacity", 0.8)
        .html(d => {
            return state.inCell(help.dateDataFilter(state, d))
        })
        .attr("cursor", "default");

    return days;
}

/**
 * 
 * @param {*} state 
 * @param {*} days 
 */
const fillDays = (state, days) => {
    // Fill day cell colors from daily mean
    days
        .selectAll("rect.day-fill")
        .transition()
        .duration(500)
        .attr("fill", (d, i) => {
            let fill = state.parsed.filter(h => {
                return d3.timeFormat("%Y-%m-%d")(h.date) === d3.timeFormat("%Y-%m-%d")(d);
            })[0];

            if (typeof fill !== 'undefined') {
                return fill.color;
            } else {
                return "#F4F4F4";
            }
        });
}

const dayCallbacksHandler = (state, days) => {
    // Add highlight callback
    days
        .on("mouseenter", (d, e) => {
            return help.mouseEnterCallback(state, d, e);
        })
        .on("mouseleave", (d, e) => {
            return help.mouseLeaveCallback(state, d, e);
        });

    // Add on click callback
    days
        .on("click", (d) => {
            help.onClickCallback(state, d);
        });
}

const tooltipHandler = (state, days) => {
    if (state.showTooltip) {

    }
}

/**
 * 
 * @param {*} state 
 * @param {*} ref 
 */
export const renderCalendar = (state, ref) => {

    state.parsed = help.prepData(state);

    let sandbox = createSandbox(state, ref);
    let months = drawMonths(state, sandbox);
    let days = drawDays(state, months);

    fillDays(state, days);

    dayCallbacksHandler(state, days);
    tooltipHandler(state, days);

}