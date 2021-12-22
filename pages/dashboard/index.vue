<template>
  <div>
    <title-bar :title="title" :subtitle="$moment(subtitle).format('LLLL')" />
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
    }
  },
  methods: {
    updateSubtitle() {
      this.subtitle = new Date().toLocaleString()
    },
  },
}
</script>
