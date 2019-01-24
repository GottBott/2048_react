import React, { Component } from 'react';
import './App.css';
import * as d3 from 'd3'
class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
        this.getColorFromValue = this.getColorFromValue.bind(this)
    }

    componentDidMount() {
        this.createBarChart()
    }
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {

        const svg = d3.select('svg')

        let board = svg.attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 500 500")
            .classed("svg-content-responsive", true)
            .attr("version", "1.1")
            .attr("baseProfile", "full")
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .append("g")
            .attr("transform", "translate(0,0)");

        board.append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('rx', 20)
            .attr('ry',20)
            .style('fill', '#bbada0');

        const padding = 20
        let offsetTop = padding
        let offsetRight = padding
        for (let row of this.props.data.board) {
            for (let square of row) {
                if (square > 0) {
                    board.append('rect')
                        .attr('width', '100')
                        .attr('height', '100')
                        .attr('x', offsetRight)
                        .attr('y', offsetTop)
                        .attr("rx", 20)
                        .attr("ry", 20)
                        .style('fill', this.getColorFromValue(square));

                    board.append("text")
                        .attr('x', offsetRight + 50)
                        .attr('y', offsetTop + 50)
                        .attr("dy", ".35em")
                        .style("text-anchor", "middle")
                        .text(Math.pow(2, square));
                }
                else {
                    board.append('rect')
                        .attr('width', '100')
                        .attr('height', '100')
                        .attr('x', offsetRight)
                        .attr('y', offsetTop)
                        .attr("rx", 20)
                        .attr("ry", 20)
                        .style('fill', 'rgb(203,198,179)');
                }
                offsetRight += 100 + padding
            }
            offsetRight = padding
            offsetTop += 100 + padding
        }
    }

    getColorFromValue(value) {
        var colors = {
          1: 'rgb(238 228 218)',
          2: 'rgb(237,224,200)',
          3: 'rgb(242,177,121)',
          4: 'rgb(245,149,99)',
          5: 'rgb(246,124,95)',
          6: 'rgb(246,94,59)',
          7: 'rgb(237,207,114)',
          8: 'rgb(237,204,97)',
          9: 'rgb(237,200,80)',
          10: 'rgb(237,197,63)',
          11: 'rgb(237 194 46)',
        };
        return value > 11 ? 'rgb(255,0,0)' : colors[value];
      }

    render() {
        return (
            <svg ref={node => this.node = node}
                width={'100%'} height={'100%'}>
            </svg>
        );
    }
}

export default GameBoard;
