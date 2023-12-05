<template>
    <div>
        <highchart :options="chartOptions" />

    </div>
</template>

<script>
    export default {
        props:['categories','dataSeries','colors'],
        computed: {
            chartOptions() {
                const ini = this
                return {
                    chart: {
                            type: 'column'
                        },
                        title: {
                            text: null
                        },
                        subtitle: {
                            text: null
                        },
                    colors: ini.colors ? ini.colors : ['#72D2E8', '#CC433B', '#6A6DC2', '#A7EF5F', '#9B227D'] ,
                        xAxis: {
                            // categories: [
                            //     'Bandung',
                            //     'Jakarta',
                            // ],
                            categories: ini.categories,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: null
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        credits: {
                            enabled: false,
                        },
                        legend: {
                            enabled:true,
                            layout: 'horizontal',
                            align: 'right',
                            verticalAlign: 'top',
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: ini.dataSeries
                        // series: [{
                        //     name: 'Posttest',
                        //     data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4,
                        //         194.1, 95.6, 54.4]

                        // }, {
                        //     name: 'Pretest',
                        //     data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5,
                        //         106.6, 92.3]

                        // }]
                }
            }
        }
    }
</script>
