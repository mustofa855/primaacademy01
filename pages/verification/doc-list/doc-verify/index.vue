<template>
  <div>
    <title-bar :title="title" />
  </div>
  <div id="app">
    <WebViewer :path="`${publicPath}webviewer`" url="https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf" />
  </div>
</template>

<style>
  html,
  body {
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0 auto;
    height: 100vh;
  }

  #webviewer {
    height: 100vh;
  }
</style>
  
<script>
import TitleBar from '~/components/DocVerify.vue'
import WebViewer from '../components/WebViewer.vue'
export default {
  name: 'app',
  components: {
    TitleBar,
    WebViewer
  },
  layout: 'admin',
  data() {
    return {
      publicPath: process.env.BASE_URL
    }
  },
  methods: {
  },
}
</script>
  