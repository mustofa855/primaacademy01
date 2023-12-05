<template>
    <div class="w-full peta-highcharts stop-scrolling">
        <highchart 
            :options="chartOptions"
            :exporting="exporting?exporting:false" 
            :modules="['exporting','export-data']" 
        />
    </div>
</template>

<script>
    export default {
        props: ['categories', 'seriesData','colors','legend','title','yLabel','exporting', 'height'],
        data() {
            return {
                // colors: null,
                // categories: ['Produk', 'Acara', "Blog"],
                // dataSeries: [{
                //         name: 'Approach',
                //         data: [100, 25, 75],
                //         totalData: 200
                //     }]  
            }
        },
        computed: {
            defaultColors() {
                return this.$store.state.opsi.chartColors
            },

            chartOptions() {
                const ini = this
                const defaultTinggi = 40
                const tinggiChart = this.categories.length * defaultTinggi + 100
                return {
                    chart: {
                        type: 'bar',
                        marginBottom: ini.legend ? 100 : 0,
                        marginTop: ini.exporting && ini.exporting === true ? 40 : 0,
                        // height: ini.height ? ini.height : 400,
                        // height: (9 / 16 * 100) + '%', // 16:9 ratio
                        height: ini.height ? ini.height : tinggiChart,
                        style: {
                            fontFamily: "'Public Sans', sans-serif"
                        }
                    },
                    title: {
                        text: ini.title ? ini.title : null,
                        align: 'left'
                    },
                    subtitle: {
                        text: null
                    },
                    colors: ini.colors ? ini.colors : ini.defaultColors,
                    xAxis: {
                        categories:ini.categories,
                        title: {
                            text: null
                        },
                        gridLineWidth: 1,
                        lineWidth: 1,

                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ini.yLabel ? ini.yLabel : null,
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        },
                        gridLineWidth: 0
                    },
                    tooltip: {
                        headerFormat: '',
                        backgroundColor: "rgba(255,255,255,0.8)",
                        pointFormat: '{point.category}: {point.y}',
                        footerFormat: '',
                        shared: true,
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            },
                            groupPadding: 0.1
                        }
                    },
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        x: 0,
                        y: 0,
                        floating: false,
                        enabled: ini.legend ? ini.legend : false
                    },
                    credits: {
                        enabled: false
                    },
                    series: ini.seriesData
                    // series: [{
                    //     name: 'Year 1990',
                    //     data: [631, 727, 3202, 721, 26]
                    // }, {
                    //     name: 'Year 2000',
                    //     data: [814, 841, 3714, 726, 31]
                    // }, {
                    //     name: 'Year 2010',
                    //     data: [1044, 944, 4170, 735, 40]
                    // }, {
                    //     name: 'Year 2018',
                    //     data: [1276, 1007, 4561, 746, 42]
                    // }]
                }
            }
        },

        methods: {
        }
    }
</script>

