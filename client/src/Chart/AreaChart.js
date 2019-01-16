import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

let month1 = new Date();
month1.setMonth(month1.getMonth() - 1);

let month6 = new Date();
month6.setMonth(month6.getMonth() - 6);

let month12 = new Date();
month12.setMonth(month12.getMonth() - 12);

let year5 = new Date();
year5.setFullYear(year5.getFullYear() - 5);

let year10 = new Date();
year10.setFullYear(year10.getFullYear() - 10);

class AreaChart extends Component {

        state = {
            selection: 'six_months',
            options: {
                annotations: {
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 0,
                    style: 'hollow',
                },
                yaxis: {
                    labels: {
                        formatter: function (value) {
                            return "$" + value;
                        }
                    },
                },
                xaxis: {
                    type: 'datetime',
                    min: month12.getTime(),
                    max: new Date().getTime(),
                    tickAmount: 6,
                },
                tooltip: {
                    x: {
                        format: 'dd MMM yyyy'
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100]
                    }
                }
            },
            series: [{
                name: 'BTC',
                data: []
            }],
        }

    componentDidMount = () => {
        this.getBalance(6);
    }

    getBalance = (ago) => {
        const pubkey = '028f002c55c96f95c51a5dbd45e69bb1bab59ae50a257281b7aeb4d4921a6e34c2';
        let time = new Date();
        let dataArr = [{ x: year10, y: 523 }, { x: year5, y: 1012 }, { x: month12, y: 2324 }, { x: month6, y: 1731 }, { x: month1, y: 1133 }, { x: new Date(), y: 841 }];
        let timeAgo = time.setMonth(time.getMonth() - ago);
        let start = new Date(timeAgo);
        for (let i = 1; i < ago+1; i++ ) {
            start.setMonth(start.getMonth() + 1);
            let isoTime = new Date(start).toISOString();
            axios.get(`http://localhost:3000/api/BTC/regtest/wallet/${pubkey}/balance/${isoTime}`)
            .then(data => {
                dataArr.push({ x: start, y: data.data.balance })
                this.setData(dataArr);
            })
            .catch(err => console.log(err));
        }
    }

    setData = (dataArr) => {
        let sampleData = [{ x: year10, y: 523 }, { x: year5, y: 1012 }, { x: month12, y: 2324 }, { x: month6, y: 1731 }, { x: month1, y: 1133 }, { x: new Date(), y: 841 }];
        this.setState({series: [{ data: sampleData }] });
    }

    updateData(timeline) {
        this.setState({
            selection: timeline
        })

        switch (timeline) {
            case 'one_month':
                this.setState({
                    options: {
                        xaxis: {
                            min: month1.getTime(),
                            max: new Date().getTime(),
                        }
                    }
                })
                break;
            case 'six_months':
                this.setState({
                    options: {
                        xaxis: {
                            min: month6.getTime(),
                            max: new Date().getTime(),
                        }
                    }
                })
                break;
            case 'one_year':
                this.setState({
                    options: {
                        xaxis: {
                            min: month12.getTime(),
                            max: new Date().getTime(),
                        }
                    }
                })
                break;
            case 'five_year':
                this.setState({
                    options: {
                        xaxis: {
                            min: year5.getTime(),
                            max: new Date().getTime(),
                        }
                    }
                })
                break;
            case 'ten_year':
                this.setState({
                    options: {
                        xaxis: {
                            min: year10.getTime(),
                            max: new Date().getTime(),
                        }
                    }
                })
                break;
            default:

        }
    }

    render() {

        return (


            <div id="chart">
                <div className="toolbar">
                    <button onClick={() => {this.updateData('one_month'); this.getBalance(1)}} id="one_month" className={(this.state.selection === 'one_month' ? 'active' : '')}>1M</button>
                    <button onClick={() => {this.updateData('six_months'); this.getBalance(6)}} id="six_months" className={(this.state.selection === 'six_months' ? 'active' : '')}>6M</button>
                    <button onClick={() => {this.updateData('one_year'); this.getBalance(12)}} id="one_year" className={(this.state.selection === 'one_year' ? 'active' : '')}>1Y</button>
                    <button onClick={() => {this.updateData('five_year'); this.getBalance(60)}} id="five_year" className={(this.state.selection === 'five_year' ? 'active' : '')}>5Y</button>
                    <button onClick={() => {this.updateData('ten_year'); this.getBalance(120)}} id="ten_year" className={(this.state.selection === 'ten_year' ? 'active' : '')}>10Y</button>
                </div>
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" height="350" />
            </div>
        );
    }
}

export default AreaChart;
