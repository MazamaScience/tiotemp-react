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
    let svg = canvas
        .data(monthly)
        .enter()
        .append("svg")
        .attr("class", "month-cell")
        .attr("width", help.monthCellDim(props))
        .attr("height", help.monthCellDim(props))
        .style("padding", props.monthPadding);

        // Add the title of each svg month
        svg
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
        svg
            .append("svg:title")
            .text(d => {
                return d3.timeFormat("%B %Y")(d); 
            });

        // Add the weekday text below title (mon, tues, etc)
        svg
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

            // Add the g layer to each day to append rect and text to
        svg
            .selectAll("g.day")
            .data((d, i) => {
                return d3.timeDays(d, new Date(d.getFullYear(), d.getMonth() + 1, 1));
            })
            .enter()
            .append("g")
            .attr("class", "day")
            .exit();

        // Add the default color fill
        svg
            .selectAll("g.day")
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

                // Add the day text to each cell
        svg
            .selectAll("g.day")
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

        return svg;
}

const fillDays = (props, months) => {
            // Fill day cell colors from daily mean
        let days = months
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
             
        return days;
}

export const renderCalendar = (props, ref) => {
    
    props.parsed = help.prepData(props);
    let canvas = createCanvas(props, ref);
    let months = drawMonths(props, canvas);
    let days = fillDays(props, months);


console.log({canvas, months, days})
}