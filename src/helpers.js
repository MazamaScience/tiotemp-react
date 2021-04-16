import * as d3 from 'd3';

export const prepData = (state) => {
    // Remap the colors
    let colorMap = (value) => {
        if (value === null) {
            return "#F4F4F4";
        } else {
            return d3.scaleThreshold()
                .domain(state.breaks)
                .range(state.colors)(value);
        }
    }

    let parsedData = state.data
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

    return Object.values(parsedData);
}

export const getMonthly = (state) => {

    let dates = state.parsed.map(d => { return (new Date(d.date)); })

    let domain;

    if (state.fullYear) {
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
        if (typeof state.showMonths !== "undefined") {
            domain = domain.filter(d => {
                return state.showMonths.includes(d.getMonth() + 1);
            });
        }
    }

    return domain;
}

// Month cell box dimensions
export const monthCellDim = (state) => {
    return 7 * (state.cellSize + state.cellPadding) + 0.5 * state.cellPadding;
}

export const monthCellHeight = (state) => {
    return 7 * (state.cellSize + state.cellPadding) + 0.5 * state.cellPadding;
}

// Get svg day positions of date 
export const dayCellX = (state, date) => {
    let n = d3.timeFormat("%w")(date);
    return n * (state.cellSize + state.cellPadding) + state.cellPadding;
}

export const dayCellY = (state, date) => {
    let day1 = new Date(date.getFullYear(), date.getMonth(), 1);
    return (((d3.timeFormat("%U")(date) - d3.timeFormat("%U")(day1)) * state.cellSize) +
        ((d3.timeFormat("%U")(date) - d3.timeFormat("%U")(day1)) * state.cellPadding) +
        state.cellPadding + state.cellSize);
}

// Filter dataset by date
export const dateDataFilter = (state, date) => {
    // TODO: decrease the cost. This filters the data and prepares it every call.
    let info = state.parsed.filter(d => {
        return (new Date(d[0])).toLocaleDateString() === date.toLocaleDateString();
    });

    if (!info.length) {
        return {
            date: date
        };
    } else {
        return prepData(state)[0];
    }
}

export const mouseEnterCallback = (state, d, i) => {
    state.highlight(d);
}

export const mouseLeaveCallback = (state, d, i) => {
    d3.select(d.target)
        .style("opacity", 1);

    d3.select(d.target)
        .select("rect.day-fill")
        .style("stroke", "transparent");
}

export const onClickCallback = (state, d) => {
    return state.onClick(d);
}

export const tooltipCallback = (state, d) => {
    let dayData = state.parsed.filter(h => {
        return d3.timeFormat("%Y%m%d")(h.date) === d3.timeFormat("%Y%m%d")(d)
    })[0]
    return state.tooltip(dayData ?? { date: d });
}