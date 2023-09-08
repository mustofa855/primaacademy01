<template>
    <div>
      <title-bar :title="title" />
    </div>
  </template>
  
  <script>
  import TitleBar from '~/components/VerifyPage.vue'
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
    },
  }
  </script>
  