<template>
    <div>
      <title-bar :title="title" />
    </div>
  </template>
  
  <script>
  import TitleBar from '~/components/DocList.vue'
  export default {
    components: { TitleBar },
    layout: 'admin',
    data() {
      return {
        title: 'See Detail',
        subtitle: new Date(),
      }
    },
    
    methods: {
    },
  }
  </script>
  