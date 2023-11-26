<template>
  <div>
    <title-bar :title="title" />
    <LineChart/>
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue'
import LineChart from '~/components/LineChart.vue'

export default {
  components: { TitleBar, LineChart},
  layout: 'admin',
  data() {
    return {
      title: 'Dashboard',
      subtitle: new Date(),
    }
  },
  methods: {
  },
}
</script>
