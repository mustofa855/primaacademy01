<template>
  <div class="mb-8">
    <!-- title section -->
    <div class="text-2xl font-bold">{{ title }}</div>
    <!-- subtitle section -->
    <div class="text-gray-500">{{ subtitle ? subtitle : $moment(time).format('LLLL') }}</div>
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
  data() {
    return {
      time: new Date(),
    }
  },
}
</script>
