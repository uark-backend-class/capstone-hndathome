const d3 = require('d3');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function createSVG(series, yValue) {
    const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

    let body = d3.select(fakeDom.window.document).select('body');
    //------------------------1. PREPARATION------------------------//
    //-----------------------------SVG------------------------------// 
    var margin = { top: 0, right: 20, bottom: 0, left: 60 },
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    const padding = 5;
    const adj = 30;
    // we are appending SVG first
    const svg = body.append('div').attr('class', 'container').append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-"
            + adj + " -"
            + adj + " "
            + (width + adj * 3) + " "
            + (height + adj * 3))
        .style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);

    //-----------------------------DATA-----------------------------//    
    const timeConv = (series[0].values).length > 7 ? d3.timeParse("%Y%m%d") : d3.timeParse("%Y-%m-%d");

    let slices = series.reduce((accumulator, current) => {
        var tempCurrent = Object.assign({}, current)
        var tempValues = current.values.map(obj => {
            var temp = Object.assign({}, obj);
            temp.date = timeConv(obj.date)
            return temp;

        })
        tempCurrent.values = tempValues;
        return [...accumulator, tempCurrent];
    }, []);

    //----------------------------SCALES----------------------------//
    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    // xScale.domain(d3.extent(data, function (d) {
    //     return timeConv(d.date)
    // }));
    xScale.domain(d3.extent(slices[0].values, function (d) {
        return d.date
    }));
    yScale.domain([(0), d3.max(slices, function (c) {
        return d3.max(c.values, function (d) {
            return d[yValue] + 4;
        });
    })
    ]);

    //-----------------------------AXES-----------------------------//
    const yTickCount = (slices[0].values).length > 7 ? 20 : (slices[0].values).length
    const xInterval = (slices[0].values).length > 7 ? d3.timeMonth.every(2) : d3.timeDay.every(1)
    const yaxis = d3.axisRight()
        .ticks(yTickCount)
        .scale(yScale);

    const xaxis = d3.axisBottom()
        .ticks(xInterval)
        .tickFormat(d3.timeFormat('%b %d'))
        .scale(xScale);

    //----------------------------LINES-----------------------------//
    const line = d3.line()
        .x(function (d) { return xScale(d.date); })
        .y(function (d) { return yScale(d[yValue]); });

    let id = 0;
    const ids = function () {
        return "line-" + id++;
    }
    //-------------------------2. DRAWING---------------------------//
    //-----------------------------AXES-----------------------------//
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xaxis);

    svg.append("g")
        .attr("class", "axis")
        .call(yaxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("dy", ".75em")
        .attr("y", 6)
        .style("text-anchor", "end")

    //----------------------------LINES-----------------------------//
    const lines = svg.selectAll("lines")
        .data(slices)
        .enter()
        .append("g");

    lines.append("path")
        .attr("class", ids)
        .attr("d", function (d) { return line(d.values); });

    lines.append("text")
        .attr("class", "serie_label")
        .datum(function (d) {
            return {
                id: d.id,
                value: d.values[d.values.length - 1]
            };
        })
        .attr("transform", function (d) {
            return "translate(" + (xScale(d.value.date) + 10)
                + "," + (yScale(d.value[yValue]) + 5) + ")";
        })
        .style("font-weight", "bolder")
        .attr("x", -200)
        .text(function (d) {
            if ((slices[0].values).length > 7)
                return `${d.id} ${yValue[0].toUpperCase()}${yValue.slice(1)}s`
            else
                return d.id;
        });

    // Make an SVG Container
    // let svgContainer = body.append('div').attr('class', 'container')
    //     .append("svg")
    //     .attr("width", 400)
    //     .attr("height", 400)
    //     .attr("role", "img")
    //     .attr("viewBox", "0 0 400 400")
    //     .attr("style", "width: 100%;height: 100%;")

    // Draw a line
    // let circle = svgContainer.append("line")
    //     .attr("x1", 5)
    //     .attr("y1", 5)
    //     .attr("x2", 500)
    //     .attr("y2", 500)
    //     .attr("stroke-width", 2)
    //     .attr("stroke", "black");

    return body.select('.container').html();
}

module.exports = {
    createSVG,
};