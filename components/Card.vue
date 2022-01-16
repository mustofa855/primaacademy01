<template>
  <!-- card section -->
  <div class="bg-white shadow-md rounded-md">
    <!-- content section -->
    <div class="p-4 px-12">
      <CardTitle v-if="title">{{ title }}</CardTitle>
      <slot />

      <div class="text-right p-4 px-12">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
<script>
import CardTitle from "./CardTitle.vue";
export default {
  name: "Card",
  components: { CardTitle },
  props: {
    title: {
      type: String,
      default: "",
    },
  },
}
</script>
