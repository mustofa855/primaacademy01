<template>
  <div>
    <title-bar :title="'Asesor'" :subtitle="'Anda dapat mengelola sesor'" :back="'/master-data'" />
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue'
export default {
  components: { TitleBar },
  layout: 'admin',

}
</script>

<style>
</style>
