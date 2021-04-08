/**
 * Mazama Science
 */

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const defaultTooltip = d => {
    if (typeof d.mean !== "undefined") {
        return d.date.toLocaleDateString() + "<br>" + d.mean + " " + "(\u00B5g/m\u00B3)";
    } else {
        return d.date.toLocaleDateString() + "<br> No data.";
    }
}
const defaultOnClick = d => {
    console.log(d);
}
const defaultInCell = d => {
    return d.date.getDate();
}

TimeseriesCalendar
    .defaultProps = {
    data: [["2018/11/23 00:01"], ["2019/12/31 00:01"], ["2020/01/01 00:01", 1], ["2020/01/02 00:01", 3], ["2020/01/03 00:01", 6], ["2020/01/04 00:01", 16]],
    colors: ["#d8f06e", "#68d0ab", "#7ea3b4", "#9b81b7"],
    breaks: [2, 5, 10, 15],
    fullYear: false,
    showMonths: [1, 12],
    cellPadding: 5,
    monthPadding: 10,
    cellSize: 26,
    cellRadius: 3,
    highlightStroke: 0,
    columns: 3,
    onClick: defaultOnClick,
    inCell: defaultInCell, // allow custom cell stuff
    inTooltip: defaultTooltip
};

function TimeseriesCalendar(props) {

    const calRef = useRef();
    const tooltipRef = useRef();

    // Use hook that depends on data to redraw the calendar
    useEffect(() => {

        const data = prepareData(props.data);

        // Draw the calendar component
        drawCal(data);

    }, [props]);

    function prepareData(data) {
        let cellData = data
            .map(d => {
                return {
                    date: (new Date(d[0])).toLocaleDateString(),
                    time: (new Date(d[0])).getTime(),
                    val: (isNaN(Number(d[1])) ? 0 : Number(d[1]))
                };
            })
            .reduce((m, d) => {
                if (!m[d.date]) { // if date object dne create one 
                    m[d.date] = {
                        date: new Date(d.time),
                        mean: d.val,
                        color: colorMap(d.val),
                        sum: d.val,
                        count: 1,
                        data: [
                            [d.time, d.val]
                        ]
                    };
                } else { // add date properties
                    m[d.date].sum += d.val;
                    m[d.date].count += 1;
                    m[d.date].mean = m[d.date].sum / m[d.date].count;
                    m[d.date].color = colorMap(m[d.date].mean);
                    m[d.date].data.push([d.time, d.val]);
                }
                return m;
            }, {})

        return Object.values(cellData)
    }

    // tiotemp calendar
    function drawCal(data) {

        let dates = getDatesStr(data);
        // console.log(dates)
        const data_monthly = getDateDomain(makeDate(dates));

        // console.log(data_monthly)

        var h = 5 * (props.cellSize + props.cellPadding) + 2 * props.monthPadding;
        var w = 7 * (props.cellSize + props.cellPadding) + 2 * props.monthPadding;

        // Define react cal canvas 
        const canvas = d3.select(calRef.current)
            .append("div")
            .attr("class", "grid-container")
            .style("display", "grid")
            .style("grid-template-columns", `repeat(${props.columns}, minmax(${w}px, ${h}px))`)
            .style("grid-template-rows", "auto auto auto")
            // .style("padding", "10px")
            .style("justify-self", "center")
            .selectAll("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("style", "background-color:white")
            .classed("svg-content", true);


        // Define the svg month-cells to draw on
        var svg = canvas
            .data(data_monthly)
            .enter()
            .append("svg")
            .attr("class", "month-cell")
            .attr("width", monthCellDim)
            .attr("height", monthCellDim)
            .style("padding", props.monthPadding);

        // Add the title of each svg month
        svg
            .append("text")
            .attr("class", "month-label")
            .attr("x", 0.5 * monthCellDim())
            .attr("y", "1em")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", 0.5 * props.cellSize)
            .text(d => {
                return d3.timeFormat("%B")(d);
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
            .attr("x", (d, i) => {
                if (i < 7) {
                    return dayCellX(d) + props.cellSize * 0.5;
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
                return dayCellX(d);
            })
            .attr("y", d => {
                return dayCellY(d);
            })
            .attr("date", d => {
                return d;
            });

        // Add the day text to each cell
        svg
            .selectAll("g.day")
            .append("text")
            .attr("x", d => {
                return dayCellX(d) + props.cellSize * 0.5;
            })
            .attr("y", d => {
                return dayCellY(d) + (props.cellSize * 0.5 + props.cellSize * 0.3 / 2);
            })
            .attr("class", "day-text")
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", props.cellSize * 0.45)
            .style("opacity", 0.8)
            //.append("tspan")

            .html(d => {
                return props.inCell(dateDataFilter(props.data, d))
            })

            .attr("cursor", "default");


        // Fill day cell colors from daily mean
        d3.selectAll("rect.day-fill")
            .transition()
            .duration(500)
            .attr("fill", (d, i) => {
                let fill = data.filter(h => {
                    return d3.timeFormat("%Y-%m-%d")(h.date) === d3.timeFormat("%Y-%m-%d")(d);
                })[0];

                if (typeof fill !== 'undefined') {
                    return fill.color;
                } else {
                    return "#F4F4F4";
                }
            });

        // Callback method on cell click
        d3.selectAll("g.day")
            .on("click", function (d) {
                let val = d;
                props.onClick(this, val);
            });
        d3.selectAll("g.day")
            .on("mouseover", mouseoverDaycell)
            .on("mouseout", mouseoutDaycell)
    }

    // Currently assuming an n-len array of 2-len arrays
    function getDatesStr(arr) {
        return arr.map(d => {
            return d.date;
        });
    }

    function getValStr(arr) {
        return arr.map(d => {
            return d[1];
        });
    }

    function makeDate(arr) {
        return arr.map(d => {
            return (new Date(d));
        });
    }

    function getDateDomain(dates) {
        let domain;
        if (props.fullYear) {
            // TODO: Check for errors with tz 
            let sd = new Date('01-01-2000');
            let ed = new Date('12-31-2000');
            sd.setFullYear(dates[0].getFullYear());
            ed.setFullYear(dates[dates.length - 1].getFullYear());
            domain = d3.timeMonths(sd, ed);
        } else {
            domain = [... new Set(dates
                .map(d => {
                    return d3.timeMonth(d).getTime()
                }))]
                .map(d => {
                    return new Date(d)
                });
            if (typeof props.showMonths !== "undefined") {
                domain = domain.filter(d => {
                    console.log(d3.timeMonths(props.showMonths))
                    return props.showMonths.includes(d.getMonth() + 1);
                })
            }
        }
        return domain;
    }

    function monthCellDim() {
        return 7 * (props.cellSize + props.cellPadding) + 0.5 * props.cellPadding;
    }

    // Get svg positions of date 
    function dayCellX(date) {
        let n = d3.timeFormat("%w")(date);
        return n * (props.cellSize + props.cellPadding) + props.cellPadding;
    }

    function dayCellY(date) {
        let day1 = new Date(date.getFullYear(), date.getMonth(), 1);
        return (((d3.timeFormat("%U")(date) - d3.timeFormat("%U")(day1)) * props.cellSize) +
            ((d3.timeFormat("%U")(date) - d3.timeFormat("%U")(day1)) * props.cellPadding) +
            props.cellPadding + props.cellSize);
    }

    // Remap the colors
    function colorMap(value) {
        if (value === null) {
            return "#F4F4F4";
        } else {
            return d3.scaleThreshold()
                .domain(props.breaks)
                .range(props.colors)(value);
        }
    }

    // Highlight day cell
    function highlightDaycell(d) {
        d3.select(d)
            .select("rect.day-fill")
            .style("opacity", 0.75);

        d3.select(d)
            .select("rect.day-fill")
            .style("stroke", "#605e5d")
            .style("stroke-width", props.highlightStroke);

    }

    function revertDaycell(d) {
        d3.select(d)
            .select("rect.day-fill")
            .style("opacity", 1);

        d3.select(d)
            .select("rect.day-fill")
            .style("stroke", "transparent");
    }

    function showTooltip(e, d) {
        d3.select(tooltipRef.current)
            .style("visibility", "visible")
            .style("position", "absolute")
            .style('left', `${e.pageX + 10}px`)
            .style('top', `${e.pageY + 10}px`)
            .html(tooltipInfo(d))
            .style("text-anchor", "middle")
            .style("font-family", "sans-serif")
            .style("font-size", "0.7em")
            .style("background", "#282b30")
            .style("border", "solid")
            .style("border-color", "#282b30")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("color", "#F4F4F4")
            .style("position", "absolute")
            .style("z-index", 100);
    }

    function hideTooltip() {
        d3.select(tooltipRef.current)
            .style("visibility", "hidden")
            .text("");
    }

    function tooltipInfo(d) {
        let date = d.__data__;
        let daycellInfo = dateDataFilter(props.data, date);
        // Use provided callback 
        return props.inTooltip(daycellInfo);
    }

    function mouseoverDaycell(e) {
        highlightDaycell(this);
        showTooltip(e, this);

    }

    function mouseoutDaycell(d) {
        revertDaycell(this);
        hideTooltip();
    }

    function dateDataFilter(data, date) {

        // TODO: decrease the cost. This filters the data and prepares it every call.
        let info = data.filter(d => {
            return (new Date(d[0])).toLocaleDateString() === date.toLocaleDateString();
        });

        if (!info.length) {
            return {
                date: date
            };
        } else {
            return prepareData(info)[0];
        }
    }


    return (
        <div ref={
            calRef
        }
            id='tiotemp-cal' >
            <div ref={
                tooltipRef
            }
                id='tiotemp-cal-tooltip' >
            </div>
        </div>
    );
}

export default TimeseriesCalendar;