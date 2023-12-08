<template>
  <!-- <div>
    <title-bar :title="title" />
    <HchartBarChart name="chart" :kategori="kategori" :dataSeries="dataSeries" />
  </div> -->
  <div>
    <title-bar :title="title" />
    <div class="grid grid-cols-2 gap-4">
      <div class=" p-5 bg-white rounded-lgplus shadow-dashboard">
        <!-- Konten Bagian Pertama-->
        <!-- <pre>{{ dataChart }}</pre>
        <pre>{{ kategori }}</pre>
        <pre>{{ dataSeries }}</pre> -->
        <HchartBarChart :kategori="kategori" :dataSeries="dataSeries" />
      </div>
      <div class="p-5 bg-white rounded-lgplus shadow-dashboard">
        <!-- Konten Bagian Kedua -->
        <!-- <pre>{{ dataSeriesDonut }}</pre> -->
        <!-- <div class="text-warna-tiga text-5xlplus">{{ dataSeries[0].totalData }}</div> -->
        <HchartDonatChart :seriesData="dataSeriesDonut.seriesData"  :seriesName="dataSeriesDonut.seriesName" :colors="dataSeriesDonut.colors" :legend="true" />
        <!-- <HchartDonat v-if="reportInisiatif" :seriesData="reportInisiatif.seriesData" :seriesName="reportInisiatif.seriesName" :colors="reportInisiatif.colors" :legend="true" /> -->
        <!-- Konten untuk bagian kedua di sini -->
      </div>
    </div>

  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue'

export default {
  components: { TitleBar },
  layout: 'admin',
  data() {
    return {
      title: 'Dashboard',
      subtitle: new Date(),

      kategori: ['Produk', 'Acara', "Blog"],
      dataSeries: [{
        name: 'Overview - Total Konten',
        data: [100, 25, 75],
        totalData: 200
      }],
      
      dataSeriesDonut: {
          seriesData : [{
                name: 'data1',
                y: 20
            }, {
                name: 'data2',
                y: 80
            }],
          seriesName : 'Overview - Total Konten',
          colors: ['#C0392B', '#633974', '#21618C', '#1E8449', '#D4AC0D', '#D4AC0D','#D5F5E3', '#5DADE2']
      },
      dataChart: null
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    snakeToSpace(str) {
      return str.replace(/_/g, ' ');
    },
    async getData() {
      try {
        const response = await this.$axios.get('https://bepssi.kunci.co.id/api/dashboard/stats');
        this.dataChart = response.data.data;
        this.kategori = Object.keys(response.data.data).map(this.snakeToSpace).filter(e => e !== "total task" && "verified task count");
        this.dataSeries = [{
          name: 'Overview - Total User',
          data: Object.values(response.data.data),
          totalData: _.sum(Object.values(response.data.data))
        }]
        // {
        //     name: 'data1',
        //     y: 20
        // }
        var dataKey = Object.keys(response.data.data).filter(e => e !== "total_task")
        this.dataSeriesDonut.seriesData =  _.map(dataKey, function(e){
          return {
            name: e.replace(/_/g, ' '),
            y:response.data.data[e]
          }
        })
        console.log(this.dataSeriesDonut.seriesData)
      } catch (error) {
        console.error(error);
      }
    },

  },
}
</script>
