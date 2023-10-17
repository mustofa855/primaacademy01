<template>
    <div>
      <!-- <pre>{{ this.dataretrieve }}</pre> -->
      <title-bar :title="title" />
      <div>{{ $route.params.id }}</div>
    </div>
  </template>
  
  <script>
  import TitleBar from '~/components/DocVerify.vue'
  export default {
    components: { TitleBar },
    layout: 'admin',
    data() {
      return {
        
      }
    },
    computed: {
        id () {
            return this.$route.params.id
        }
    },
    mounted() {
        // console.log(this.id)
        this.getDataRetrive()
        // console.log("KESINI........................")
    },
    methods: {

      async getDataRetrive() {
        try {
          const response = await this.$axios.get('https://ppm-api.gusdya.net/api/mahasiswa/'+this.id);
          console.log(JSON.stringify(response.data));
          this.dataretrieve = response.data.data
          console.log(this.dataretrieve)
        } catch (error) {
          console.error(error);
        }
      },
    },
  }
  </script>
  