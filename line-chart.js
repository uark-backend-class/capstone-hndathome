const d3 = require('d3');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

function createSVG() {
    const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');

    let body = d3.select(fakeDom.window.document).select('body');

    // Make an SVG Container
    let svgContainer = body.append('div').attr('class', 'container')
        .append("svg")
        .attr("width", 400)
        .attr("height", 400)
        .attr("role", "img")
        .attr("viewBox", "0 0 400 400")
        .attr("style", "width: 100%;height: 100%;")

    // const width = 400;
    // const height = 400;
    // const margin = 5;
    // const padding = 5;
    // const adj = 30;
    // // we are appending SVG first
    // const svg = body.append('div').attr('class', 'container').append("svg")
    //     .attr("preserveAspectRatio", "xMinYMin meet")
    //     .attr("viewBox", "-"
    //         + adj + " -"
    //         + adj + " "
    //         + (width + adj * 3) + " "
    //         + (height + adj * 3))
    //     .style("padding", padding)
    //     .style("margin", margin)
    //     .classed("svg-content", true);



















    // Draw a line
    let circle = svgContainer.append("line")
        .attr("x1", 5)
        .attr("y1", 5)
        .attr("x2", 500)
        .attr("y2", 500)
        .attr("stroke-width", 2)
        .attr("stroke", "black");

    return body.select('.container').html();
}

module.exports = {
    createSVG,
};