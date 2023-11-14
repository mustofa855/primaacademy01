<template>
    <div>
      <title-bar :title="title" />
    </div>
  </template>
  
  <script>
  import TitleBar from '~/components/Coach.vue'
  export default {
    components: { TitleBar },
    layout: 'admin',
    data() {
      return {
        title: 'Test Parameter',
        subtitle: new Date(),
      }
    },
    methods: {
    },
  }
  </script>