<template>
    <highchart :options="chartOptionPie" />
</template>
<script>
export default {
    props: [ 'seriesData', 'seriesName','title','legendPosition','height','suffixName'],
    data() {
        return {
        }
    },
    computed: {
        bahasa() {
            return this.$i18n.locale === 'id' ? 0 : 1
        },


        // defaultWarna() {
        //     return this.$store.state.def.chartLegendColor
        // },

        chartOptionPie() {
            const ini = this

            return {
                chart: {
                    type: 'pie',
                    // height: ini.height ? ini.height : (9 / 16 * 100) + '%',
                    // marginTop:0,
                    // marginBottom:0,
                    marginLeft:0,
                },
                title: {
                    text: null,
                },
                tooltip: {
                    headerFormat: '<table style="min-width:100px; color:#212121;"><tr><td style="padding:0">{series.name}</td></tr>',
                    pointFormat: '<tr><td style="padding:0" ><b>{point.name}:</b> </td>' +
                        '<td style="padding:0"><b>{point.percentage:.0f}%  ({point.y} {point.suffixName})</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true,
                    shape:'callout',
                    split:true,
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                // colors: ['#72D2E8', '#CC433B'],

                colors: ini.colors ? ini.colors : ['#72D2E8', '#CC433B', '#6A6DC2', '#A7EF5F', '#9B227D','#D61D31','#63D3EA','#4347B2','#90EB35','#800080', '#F1C40F','#76448A','#D2B4DE','#EC7063',"#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"] ,
                credits: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            format: '<b>{point.name}</b>: {point.percentage:.0f} %'
                        },
                        showInLegend: true
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: this.legendPosition ? this.legendPosition.align : 'right',
                    verticalAlign: this.legendPosition ? this.legendPosition.verticalAlign : 'right',
                    itemMarginTop: 5,
                    itemMarginBottom: 5,
                    useHTML: true,
                    labelFormatter: function () {
                        return '<span style="width:200px;">' + Math.round(this.percentage) + '</span>% - ' 
                        + this.name + ' ('+ this.y.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")  + ' ' +ini.suffixName +')';
                    }

                },

                series: [{
                    name: this.seriesName,
                    colorByPoint: true,
                    data: this.seriesData,
                    // data: [ {
                    //         name: 'Edge',
                    //         y: 14.77
                    //     },  {
                    //         name: 'Firefox',
                    //         y: 4.86
                    //     }, {
                    //         name: 'Safari',
                    //         y: 2.63
                    //     }, {
                    //         name: 'Internet Explorer',
                    //         y: 1.53
                    //     },  {
                    //         name: 'Opera',
                    //         y: 1.40
                    //     }, {
                    //         name: 'Sogou Explorer',
                    //         y: 0.84
                    //     }, {
                    //         name: 'QQ',
                    //         y: 0.51
                    //     }, {
                    //         name: 'Other',
                    //         y: 2.6
                    // }]
                }]
            }
        },


    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {

        }
    }
}
</script>