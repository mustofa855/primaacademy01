<template>
    <div>
        <highchart :options="chartOptions" />
    </div>
</template>

<script>
    export default {
        props:['dataSeries','colors','suffixName','nameSeries','height'],
        data() {
            return {
                parseHeight: 0
            }
        },
        mounted() {
            this.parseHeight = this.height
            setTimeout(() => {
                this.parseHeight = this.height
            }, 1000);
        },
        computed: {
            chartOptions() {
                const parseSuffixName = this.suffixName ? this.suffixName : ''
                const ini = this
                return {
                    colors: ini.colors ? ini.colors : ['#72D2E8', '#CC433B', '#6A6DC2', '#A7EF5F', '#9B227D'] ,
                    chart: {
                        type: 'pie',
                        marginTop:0,
                        marginLeft:0,
                        marginBottom:0,
                        // height:ini.height? ini.parseHeight : 400,
                        height: ini.parseHeight,
                        spacingTop: 0,
                        spacingBottom: 0,
                        spacingLeft: 0,
                        spacingRight: 0,
                        
                        // options3d: {
                        //     enabled: true,
                        //     alpha: 0,
                        //     beta: 0
                        // },

                    },
                    title: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: false,
                            cursor: 'pointer',
                            depth: 35,
                            dataLabels: {
                                enabled: false,
                                format: '{point.name}'
                            },
                            showInLegend: true
                        }
                    },
                    legend: {
                        enabled:true,
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        itemMarginTop: 5,
                        itemMarginBottom: 5,
                        itemMarginLeft:0,

                        labelFormatter: function () {
                            return '<div >' + Math.round(this.percentage) + '</div>% - ' 
                            + this.name + ' ('+ this.y.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + ' ' + parseSuffixName   +')';
                        }

                    },
                    series: [
                        {
                            type: 'pie',
                            name: ini.nameSeries,
                            data: ini.dataSeries
                            // data: [
                            //     {name:'Kategori 1', y:80},
                            // ],

                        }
                    ],
                    responsive: {
                        rules:[
                            {
                                condition: {
                                    maxWidth:400
                                },
                                chartOptions: {
                                    chart: {
                                        height:450,
                                        width:200,
                                        marginTop:0,
                                        marginBottom:60
                                    },
                                    legend: {
                                        align: 'left',
                                        verticalAlign: 'bottom',
                                        layout: 'vertical',
                                        floating: true,
                                        itemDistance:0,
                                        
                                    }
                                }

                            }

                        ]
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>