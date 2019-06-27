import React, { useState, useEffect } from 'react';
import '../../configs';
import Navigation from '../Navigation/Navigation';
import DateRow from '../DateRow/DateRow';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';
const axios = require('axios');


export default class Dashboard extends React.Component {

    state = {
        evaluationExecuted: false,
        evaluation: false
    };

    componentDidMount() {

        axios.get(global.apiBaseURL + "/stats?allTime=true").then(response => {
            console.log(response);
        })
            .catch(error => {
                console.error("Cannot get all time stats");
            });

        this.initializeChart(this.props.config);
    }

    randomScalingFactor() {
        return Math.round(Math.random() * 100);
    }

    initializeChart(options) {

        // Pie Chart
        let el = ReactDOM.findDOMNode(this.refs.chart);
        let ctx = el.getContext("2d");
        let chart = new Chart(ctx, options);


        window.chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };

        let config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        this.randomScalingFactor(),
                        this.randomScalingFactor()
                    ],
                    backgroundColor: [
                        window.chartColors.red,
                        window.chartColors.green
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    'Not answered',
                    'Answered'
                ]
            },
            options: {
                responsive: true
            }
        };

        // Line Chart
        let priorityEl = ReactDOM.findDOMNode(this.refs.priorityChart);
        let priorityCtx = priorityEl.getContext("2d");
        var color = Chart.helpers.color;

        var barChartData = {
            labels: ["Type 3 - Low", "Type 2 - Normal", "Type 1 - High"],
            datasets: [{
                label: 'Minutes',
                backgroundColor: [color(window.chartColors.green).alpha(0.5).rgbString(), color(window.chartColors.yellow).alpha(0.5).rgbString(), color(window.chartColors.red).alpha(0.5).rgbString()],
                borderColor: [window.chartColors.green, window.chartColors.yellow, window.chartColors.red],
                borderWidth: 1,
                data: [
                    this.randomScalingFactor(),
                    this.randomScalingFactor(),
                    this.randomScalingFactor()
                ]
            }]

        };

        let priorityChartConfig = {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Average Ticket Response Time by Priority'
                }
            }
        };

        var myChart = new Chart(ctx, config);
        var priorityChart = new Chart(priorityCtx, priorityChartConfig);
    }

    render() {

        return (
            <div className="App">
                <Navigation />
                <DateRow />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Number of Tickets</h5>
                                    <p className="card-text">5000</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Average Survey Quality</h5>
                                    <p className="card-text">5 starts</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Standard Deviation</h5>
                                    <p className="card-text">0.12</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <canvas ref="chart" id="chart-area"></canvas>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-3">
                            <h6>Top 5 - Fastest workers</h6>
                            <table className="table table-hover table-sm">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Position</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3">
                            <h6>Top 5 - Quality workers</h6>
                            <table className="table table-hover table-sm">
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Position</th>
                                        <th>Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                    <tr>
                                        <td>1</td>
                                        <td>Test</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-6">
                            <canvas ref="priorityChart" id="priority-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}