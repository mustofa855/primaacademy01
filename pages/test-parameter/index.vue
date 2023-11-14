<template>
    <div>
      <title-bar :title="title" />
    </div>
  </template>
  
  <script>
  import TitleBar from '~/components/TestParameter.vue'
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