<template>
  <div>
    <title-bar
      :back="'/master-data'"
      :title="'Skema Serifikasi'"
      :subtitle="'Anda dapat mengelola skema serifikasi'"
      is-controlbar
    />
    <control-bar button-name="Tambah Sekma Baru" @buttonClick="click" />
  </div>
</template>

<script>
import ControlBar from '~/components/ControlBar.vue'
import TitleBar from '~/components/TitleBar.vue'
export default {
  components: { TitleBar, ControlBar },
  layout: 'admin',
  methods: {
    click() {
      this.$router.push('/master-data/certificate/create')
    },
  },
}
</script>

<style>
</style>
