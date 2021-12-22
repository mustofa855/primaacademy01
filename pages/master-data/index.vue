<template>
  <div>
    <title-bar :title="'Data Master'" :subtitle="'Anda Dapat Mengelola data master'" />
    <!-- content section -->
    <div class="flex">
      <kunci-card-chip :title="'Assesor'" :to="'assesor'" />
      <kunci-card-chip :title="'Skema Sertifikasi'" to="certificate" />
    </div>
  </div>
</template>

<script>
import TitleBar from "../../components/TitleBar.vue";
import KunciCardChip from '~/components/KunciCardChip.vue';
export default {
  components: { TitleBar, KunciCardChip },
  layout: "admin",
}
</script>

<style>
</style>
