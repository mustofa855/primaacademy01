<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <h2 class="text-xl">{{ subtitle }}</h2>
  </div>
</template>
<script>
export default {
  name: 'TitleAsesmen',
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
