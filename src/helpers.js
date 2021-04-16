
import * as d3 from 'd3';

export const prepData = (props) => {
    // Remap the colors
    let colorMap = (value) => {
        if (value === null) {
            return "#F4F4F4";
        } else {
            return d3.scaleThreshold()
                .domain(props.breaks)
                .range(props.colors)(value);
        }
    }

    let parsedData = props.data
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

    return Object.values(parsedData)
}

export const getMonthly = (props) => {
    console.log(props)

    let dates = props.parsed.map(d => { return (new Date(d.date)); })

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
                return props.showMonths.includes(d.getMonth() + 1);
            });
        }
    }

    return domain;
}

// Month cell box dimensions
export const monthCellDim = (props) => {
    return 7 * (props.cellSize + props.cellPadding) + 0.5 * props.cellPadding;
}

// Get svg day positions of date 
export const dayCellX = (props, date) => {
    let n = d3.timeFormat("%w")(date);
    return n * (props.cellSize + props.cellPadding) + props.cellPadding;
}

export const dayCellY = (props, date) => {
    let day1 = new Date(date.getFullYear(), date.getMonth(), 1);
    return (((d3.timeFormat("%U")(date) - d3.timeFormat("%U")(day1)) * props.cellSize) +
        ((d3.timeFormat("%U")(date) - d3.timeFormat("%U")(day1)) * props.cellPadding) +
        props.cellPadding + props.cellSize);
}

// Filter dataset by date
export const dateDataFilter = (props, date) => {
    // TODO: decrease the cost. This filters the data and prepares it every call.
    let info = props.parsed.filter(d => {
        return (new Date(d[0])).toLocaleDateString() === date.toLocaleDateString();
    });

    if (!info.length) {
        return {
            date: date
        };
    } else {
        return prepData(props)[0];
    }
}