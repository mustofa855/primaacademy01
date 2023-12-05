<template>
    <div>
        <highchart :options="chartOptions" />

    </div>
</template>

<script>
    export default {
        props: ['seriesData'],
        computed: {
            chartOptions() {
                return {
                    chart: {
                        type: 'column',
                        height:250
                    },
                    title: {
                        text: null
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    colors: ['#CC433B', '#72D2E8'],
                    xAxis: {
                        categories: [
                            this.$t('Saat Program'),
                            this.$t('Pasca Program'),
                        ],
                        crosshair: true,
                        gridLineWidth:2,

                        labels:{
                            formatter: function() {
                                const warna = this.chart.options.colors[this.pos]
                                return  '<div style="fill:'+warna+';" class="d-flex justify-center"><svg style="width:50px;height:50px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42.5 50"><path d="M16.47,2.93a5,5,0,1,1-5,5,5,5,0,0,1,5-5m-3.75,12.5h7.5a5,5,0,0,1,5,5V34.18H21.47V52.93h-10V34.18H7.72V20.43a5,5,0,0,1,5-5M39,2.93a5,5,0,1,1-5,5,5,5,0,0,1,5-5m-3.75,50v-15h-7.5L34.2,19a5,5,0,0,1,9.55,0l6.47,19h-7.5v15Z" /></svg></div><div style="text-align:center;font-weight:600;">'+this.value+'</div>'
                            },
                            useHTML:true
                        }
                    },
                    yAxis: {
                        min: 0,
                        minorTickInterval:10,
                        lineWith:1,
                        title: {
                            text: null
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:black;padding:0;">{series.name}: </td>' +
                            '<td style="padding:0 0 0 10px"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            colorByPoint: true,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: this.seriesData
                    // series: [{
                    //     name: 'Pria',
                    //     data: [49.9, 71.5]

                    // }, {
                    //     name: 'Wanita',
                    //     data: [83.6, 78.8]

                    // }]
                }
            }
        }
    }
</script>
