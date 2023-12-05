<template>
  <!-- <div>
    <title-bar :title="title" />
    <HchartBarChart name="chart" :kategori="kategori" :dataSeries="dataSeries" />
  </div> -->
  <div>
    <title-bar :title="title" />
    <div class="grid grid-cols-2 gap-4">
      <div class=" p-5 bg-white rounded-lgplus shadow-dashboard">
        <!-- Konten Bagian Pertama -->
        <!-- <pre>{{ dataChart }}</pre> -->
        <div class="text-warna-tiga text-xl">Overview - Total Konten</div>
        <div class="text-warna-tiga text-5xlplus">{{ dataSeries[0].totalData }}</div>
        <HchartBarChart :kategori="kategori" :dataSeries="dataSeries" />
      </div>
      <div class="p-5 bg-white rounded-lgplus shadow-dashboard">
        <!-- Konten Bagian Kedua -->
        <HchartBarChart :kategori="kategori" :dataSeries="dataSeries" />
        <!-- Konten untuk bagian kedua di sini -->
      </div>
      <div class="p-5 bg-white rounded-lgplus shadow-dashboard">
        <!-- Konten Bagian Ketiga -->
        <HchartBarChart :kategori="kategori" :dataSeries="dataSeries" />
        <!-- Konten untuk bagian ketiga di sini -->
      </div>
      <div class="p-5 bg-white rounded-lgplus shadow-dashboard">
        <!-- Konten Bagian Keempat -->
        <HchartBarChart :kategori="kategori" :dataSeries="dataSeries" />
        <!-- Konten untuk bagian keempat di sini -->
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
        this.kategori = Object.keys(response.data.data).map(this.snakeToSpace);
        this.dataSeries = [{
          name: 'Overview - Total User',
          data: Object.values(response.data.data),
          totalData: _.sum(Object.values(response.data.data))
        }]

      } catch (error) {
        console.error(error);
      }
    },

  },
}
</script>
