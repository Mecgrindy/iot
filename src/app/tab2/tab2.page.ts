import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from './../app.config';
import { Chart } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    //@ViewChild('barCanvasOwn') barCanvasOwn;
    //@ViewChild('barCanvas') barCanvas;

    //@ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('lineCanvas2') lineCanvas2;

    //barChart: any;
    //doughnutChart: any;
    lineChart: any;
    lineChart2: any;
    //barChartOwn: any;


    sensorList: any;
    dateList = [];
    coValuesList = [];
    co2ValuesList = [];
    lastMinute = 0;

    coWarningLine = [];
    coDangerLine = [];

    co2WarningLine = [];
    co2DangerLine = [];

    selectedHours = '1';


    constructor(private httpClient: HttpClient) {
        this.sensorList = [];
    }

    getSensors() {
        return new Promise((resolve, reject) => {
            var today = new Date();
            var hourago = new Date(today.getTime() + (1000 * 60 * 60));
            var hourago = new Date(hourago.getTime() + (1000 * 60 * 60));
            var num = +this.selectedHours;
            console.log('ASDASDASDASDAS' + num);

            for (var i = 0; i < num; i++) {
                var hourago = new Date(hourago.getTime() - (1000 * 60 * 60));
            }
            //var options = { headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' } }
            console.log('url');
            console.log(config.baseUrl + '/sensors/' + hourago.getTime());
            this.httpClient.get(config.baseUrl + '/sensors/' + hourago.getTime()).subscribe((result) => {
                console.log(result);
                
                this.sensorList = [];
                this.dateList = [];
                this.coValuesList = [];
                this.co2ValuesList = [];
                this.lastMinute = 0;
                this.sensorList = result;
                console.log('SENSORLIST');
                console.log(this.sensorList);
                
                this.sensorList.forEach(element => {
                    //console.log(element.timestamp);
                    //console.log(new Date(element.timestamp).getHours());
                    var tst = new Date(element.timestamp);
                    //console.log('diff: ' + (tst.getMinutes()-this.lastMinute)); 
                    if (true) {
                        this.lastMinute = tst.getMinutes();
                        this.dateList.push(tst.getHours() + ':' + tst.getMinutes());
                        var values = element.stringMessage.split('|');
                        //console.log(values);

                        var co = values[0].split(':');
                        var coValue = (co[1] - 1000) * 0.5;
                        var co2 = values[1].split(':');
                        var co2Value = co2[1];
                        this.coValuesList.push(coValue);
                        this.co2ValuesList.push(co2Value);
                        console.log(coValue);
                        console.log(co2Value);

                        this.coWarningLine.push(25);
                        this.coDangerLine.push(50);
                        this.co2WarningLine.push(1000);
                        this.co2DangerLine.push(2000);

                        resolve('ok');
                    }
                });

            });
        });

    }


    async selectorHours() {
        await this.getSensors();
        this.drawCharts();
    }


    async ionViewDidEnter() {

        await this.getSensors();
        this.drawCharts();
    }

    drawCharts() {
        console.log('chartos meghivodik');

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

            type: 'line',
            data: {
                labels: this.dateList,
                datasets: [
                    {
                        label: "PPM",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.coValuesList,
                        spanGaps: false,
                    },
                    {
                        label: "Warning",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255,255,0,0.4)",
                        borderColor: "rgba(255,255,0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [10, 5],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,255,0,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,255,0,1)",
                        pointHoverBorderColor: "rgba(255,255,0,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        data: this.coWarningLine,
                        spanGaps: false,
                        borderWidth: '1'
                    },
                    {
                        label: "Danger",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255,0,0,0.4)",
                        borderColor: "rgba(255,0,0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [10, 5],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,0,0,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,0,0,1)",
                        pointHoverBorderColor: "rgba(255,0,0,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        data: this.coDangerLine,
                        spanGaps: false,
                        borderWidth: '1'
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 60
                        }
                    }]
                }
            }

        });

        this.lineChart2 = new Chart(this.lineCanvas2.nativeElement, {

            type: 'line',
            data: {
                labels: this.dateList,
                datasets: [
                    {
                        label: "PPM",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(186, 112, 180,0.4)",
                        borderColor: "rgba(186, 112, 180,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(186, 112, 180,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(186, 112, 180,1)",
                        pointHoverBorderColor: "rgba(186, 112, 180,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: this.co2ValuesList,
                        spanGaps: false,
                    },
                    {
                        label: "Warning",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255,255,0,0.4)",
                        borderColor: "rgba(255,255,0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [10, 5],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,255,0,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,255,0,1)",
                        pointHoverBorderColor: "rgba(255,255,0,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        data: this.co2WarningLine,
                        spanGaps: false,
                        borderWidth: '1'
                    },
                    {
                        label: "Danger",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(255,0,0,0.4)",
                        borderColor: "rgba(255,0,0,1)",
                        borderCapStyle: 'butt',
                        borderDash: [10, 5],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(255,0,0,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(255,0,0,1)",
                        pointHoverBorderColor: "rgba(255,0,0,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        data: this.co2DangerLine,
                        spanGaps: false,
                        borderWidth: '1'
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 2500
                        }
                    }]
                },
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-0',
                        value: 5,
                        borderColor: 'rgb(75, 192, 192)',
                        borderWidth: 4,
                        label: {
                            enabled: false,
                            content: 'Test label'
                        }
                    }]
                }
            }


        });

        /*this.barChartOwn = new Chart(this.barCanvasOwn.nativeElement, {

            type: 'bar',
            data: {
                labels: this.dateList,
                datasets: [{
                    label: '# PPM',
                    data: this.coValuesList,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 150, 200, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 150, 200, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        axisY:{
                            includeZero: true
                        }
                    }]
                }
            }


        });

        this.barChart = new Chart(this.barCanvas.nativeElement, {

            type: 'bar',
            data: {
                labels: this.dateList,
                datasets: [{
                    label: '# PPM',
                    data: this.co2ValuesList,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 150, 200, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 150, 200, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }

        });*/

    }

}
