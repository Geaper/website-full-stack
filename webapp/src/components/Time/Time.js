import React, { useState, useEffect } from 'react';
import '../../configs';
import Navigation from '../Navigation/Navigation';
import DateRow from '../DateRow/DateRow';
import Chart from 'chart.js';
import ReactDOM from 'react-dom';
const axios = require('axios');


export default class Time extends React.Component {

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

        window.chartColors = {
            red: 'rgb(255, 99, 132)',
            orange: 'rgb(255, 159, 64)',
            yellow: 'rgb(255, 205, 86)',
            green: 'rgb(75, 192, 192)',
            blue: 'rgb(54, 162, 235)',
            purple: 'rgb(153, 102, 255)',
            grey: 'rgb(201, 203, 207)'
        };

        var ticketEvolutionConfig = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'Tickets',
					backgroundColor: window.chartColors.red,
					borderColor: window.chartColors.red,
					data: [
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor()
					],
					fill: false,
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Ticket Evolution'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
        };
        
        var qualityEvolutionConfig = {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [{
					label: 'Quality',
					backgroundColor: window.chartColors.green,
					borderColor: window.chartColors.green,
					data: [
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor(),
						this.randomScalingFactor()
					],
					fill: false,
				}]
			},
			options: {
				responsive: true,
				title: {
					display: true,
					text: 'Quality Evolution'
				},
				tooltips: {
					mode: 'index',
					intersect: false,
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}]
				}
			}
		};

        // Line Chart
        let ticketEvolutionEl = ReactDOM.findDOMNode(this.refs.ticketEvolutionChart);
        let ticketEvolutionCtx = ticketEvolutionEl.getContext("2d");

        let qualityEvolutionEl = ReactDOM.findDOMNode(this.refs.qualityEvolutionChart);
        let qualityEvolutionCtx = qualityEvolutionEl.getContext("2d");

        var ticketEvolutionChart = new Chart(ticketEvolutionCtx, ticketEvolutionConfig);
        var qualityEvolutionChart = new Chart(qualityEvolutionCtx, qualityEvolutionConfig);

    }

    render() {

        return (
            <div className="App">
                <Navigation />
                <DateRow />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <canvas ref="ticketEvolutionChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <canvas ref="qualityEvolutionChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div >
        );
    }
}