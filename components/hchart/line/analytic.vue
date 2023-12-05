<template>
    <div>
        <highchart   :options="chartOptions" :modules="['exporting']" :exporting="exporting?exporting:false" style="width:100%;" />
        <!-- <div class="d-flex justify-center my-2">
            <v-btn outlined small color="red" rounded class="ma-2" @click="hideAll=!hideAll">
                {{ hideAll ? ['Tampilkan Semua','Show All'][bahasa] : ['Sembunyikan Semua','Hide All'][bahasa]  }}
            </v-btn>
            <v-btn outlined small color="blue" rounded class="ma-2" @click="dataLabel=!dataLabel">
                {{ !dataLabel ? ['Tampilkan Data Label','Show Data Label'][bahasa] : ['Sembunyikan Data Label','Hide Data Label'][bahasa]  }}
            
            </v-btn>
        </div> -->

    </div>
</template>

<script>
    export default {
        props:['exporting', 'yLabel', 'seriesData','categories'],
        data() {
            return {
                hideAll:false,
                dataLabel:true
            }
        },
        watch: {
            hideAll() {
                this.toggleHide()
            }
        },
        computed: {
            bahasa() {
                return this.$i18n.locale==='id' ? 0 : 1
            },  

            chartOptions() {
                const ini = this
                return {
                    chart: {
                        // margin:[5,5,5,5]
                    },
                    title: {
                            text: null,
                            align: 'left'
                        },

                        subtitle: {
                            text: null,
                            align: 'left'
                        },

                        yAxis: {
                            enabled: false,
                            // opposite:true,
                            title: {
                                text: ini.yLabel
                            }
                        },
                        credits: {
                            enabled: false
                        },

                        xAxis: {
                            categories:ini.categories,
                            tickInterval:5,
                            accessibility: {
                                rangeDescription: 'Range: 2010 to 2020'
                            },
                            
                        },
                        colors:['#4347B2','#90EB35','#800080', '#F1C40F','#76448A','#D2B4DE','#EC7063',"#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"],
                        // colors:['#D61D31','#63D3EA','#4347B2','#90EB35','#800080', '#F1C40F','#76448A','#D2B4DE','#EC7063',"#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"],

                        legend: {
                            enabled:false,
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            itemMarginBottom: 7,
                            labelFormatter: function () {
                                return this.name + ' ('+ _.sum(this.yData) +')'
                            }
                        },

                        plotOptions: {
                            series: {
                                label: {
                                    connectorAllowed: false
                                },
                                dataLabels: {
                                    enabled: ini.dataLabel
                                }
                                // pointStart: 2010
                            }
                        },
                        series: ini.seriesData,

                        // series: [{
                        //     name: 'Installation & Developers',
                        //     data: [43934, 48656, 65165, 81827, 112143, 142383,
                        //         171533, 165174, 155157, 161454, 154610]
                        // },
                        //  {
                        //     name: 'Manufacturing',
                        //     data: [24916, 37941, 29742, 29851, 32490, 30282,
                        //         38121, 36885, 33726, 34243, 31050]
                        // }, {
                        //     name: 'Sales & Distribution',
                        //     data: [11744, 30000, 16005, 19771, 20185, 24377,
                        //         32147, 30912, 29243, 29213, 25663]
                        // }, {
                        //     name: 'Operations & Maintenance',
                        //     data: [null, null, null, null, null, null, null,
                        //         null, 11164, 11218, 10077]
                        // }, {
                        //     name: 'Other',
                        //     data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
                        //         17300, 13053, 11906, 10073]
                        // }
                    // ],

                        responsive: {
                            rules: [{
                                condition: {
                                    maxWidth: 500
                                },
                                chartOptions: {
                                    legend: {
                                        layout: 'horizontal',
                                        align: 'center',
                                        verticalAlign: 'bottom'
                                    }
                                }
                            }]
                        }
                }
            }
        },
        methods: {
            // toggleHide() {
            //     const ch = this.$refs.huhuy
            //     const listSeries = ch.chart.series
            //     const totalSeries = ch.chart.series.length
            //     if (this.hideAll) {
            //         listSeries.forEach((e,index) => {
            //             setTimeout(() => {
            //                 ch.chart.series[index].hide()
            //             },100*index)
            //         })
            //     } else {
            //         listSeries.forEach((e,index) => {
            //             setTimeout(() => {
            //                 ch.chart.series[totalSeries - index - 1].show()
            //             },100*index)
            //         })
            //     }

            //     // ch.chart.series[1].hide()
            // }
        }
    }
</script>

<style lang="scss" scoped>

</style>