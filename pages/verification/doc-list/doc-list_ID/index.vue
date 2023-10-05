<template>
    <div>
      <title-bar :title="title" />
    </div>
  </template>
  
  <script>
  import TitleBar from '~/components/DocList-ID.vue'
  export default {
    components: { TitleBar },
    layout: 'admin',
    data() {
      return {
      }
    },
    methods: {
    },
  }
  </script>
  