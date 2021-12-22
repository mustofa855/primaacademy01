<template>
  <div>
    <!-- title section -->
    <div class="text-2xl font-bold">{{ title }}</div>
    <!-- subtitle section -->
    <div class="text-gray-500">{{ subtitle }}</div>
  </div>
</template>

<script>
export default {
  name: 'TitleBar',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
}
</script>
