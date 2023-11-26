<template>
  <div>
    <title-bar :title="title" />
    <!-- <LineChart :chartData="chartData" :options="chartOptions" class="w-60 h-50"/> -->
  </div>
  
</template>

<script>
import TitleBar from '~/components/TitleBar.vue'
// import LineChart from '~/components/LineChart.vue'
export default {
  components: { 
    TitleBar, 
    // LineChart },
  },
  layout: 'admin',
  data() {
    return {
      title: 'Dashboard',
      subtitle: new Date(),
      // chartData:{
      //   labels:["Jan", "Feb", "Mar", "Apr"],
      //   datasets: [
      //     {
      //       label:"Numbers",
      //       borderColor:"#a80a0a",
      //       borderWidth: 4,
      //       pointBackgroundColor: "a80a0a",
      //       pointRadius:4,
      //       pointHoverRadius:8,
      //       pointHoverBorderColor:"000",
      //       fill: false,
      //       data:[100, 150, 300, 90],

      //     }
      //   ]
      // },
      // chartOptions:{
      //   maintainAspectRatio: false,
      //   responsive: true,
      //   tooltip:{
      //     backgroundColor: "00055e",
      //     titleFontColor:"#ffffff",
      //     bodyFontColor:"#ffffff",
      //     position:"nearest",
      //     mode:"nearest",
      //     intersect:0,
      //     bodySpacing: 4,
      //     xPadding:20
      //   }
      // }
    }
  },
  methods: {
  },
}
</script>
