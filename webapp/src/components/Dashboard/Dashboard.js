import React, { useState, useEffect } from 'react';
import '../../configs';
import Navigation from '../Navigation/Navigation';
import DateRow from '../DateRow/DateRow';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';

export default class Dashboard extends React.Component {

    /*
    componentDidMount() {
        const [users, setUsers] = useState([]);

        const fetchUsers = async () => {
            const data = await fetch(global.apiBaseURL + "/users").then(dataPromise => dataPromise.json()).then(data => {
                setUsers(data);
            });
        };

        fetchUsers();
    }
    */
    componentDidMount() {
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

        let card = {
            width: "18rem"
        }
        let top10 = {
            marginTop: "10px"
        }

        return (
            <div className="App">
                <Navigation />
                <DateRow />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="row justify-content-center">
                                <div className="col-md-2">
                                    <div className="card" style={card}>
                                        <div className="card-body">
                                            <h5 className="card-title">Number of Tickets</h5>
                                            <p className="card-text">5000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-around" style={top10}>
                                <div className="col-md-2">
                                    <div className="card" style={card}>
                                        <div className="card-body">
                                            <h5 className="card-title">Average Survey Quality</h5>
                                            <p className="card-text">5 starts</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="card" style={card}>
                                        <div className="card-body">
                                            <h5 className="card-title">Standard Deviation</h5>
                                            <p className="card-text">0.12</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <canvas ref="chart" id="chart-area"></canvas>
                            <canvas ref="priorityChart" id="priority-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}