<template>
    <div v-if="datalist">
        <pre>{{ datalist }}</pre>
        <title-bar :title="title" />
        <table class="w-full border-collapse">
            <!-- <link href="https://fonts.googleapis.com/css2?family=Your+Selected+Font&display=swap" rel="stylesheet"> -->
            <thead>
                <tr class="bg-gray-100">
                    <th class="py-2 px-4 text-left">ID</th>
                    <th class="py-2 px-4 text-left">Nama Pengirim</th>
                    <th class="py-2 px-4 text-left">Nama file</th>
                    <th class="py-2 px-4 text-left">File</th>
                    <th class="py-2 px-4 text-left">Actions</th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in datalist" :key="index">
                <tr v-for="file in item.secure_documents" :key="file.id" class="border-t">
                    <td class="py-2 px-4">{{file.id}}</td>
                    <td class="py-2 px-4">{{item.username}}</td>
                    <td class="py-2 px-4">{{file.name}}</td>
                    <td class="py-2 px-4">{{file.file}}</td>
                    <td class="py-2 px-4">
                        <button class="text-blue-500 mr-2"  @click="getData(item.id)">
                            <img :src="(`/${icon_Part}`)" class="m-auto w-8" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import TitleBar from '~/components/TitleBar.vue'
export default {
    // components: { KunciButton },
  props: {
    /**
     * icon from static folder use the extension name
     * @type {String}
     * @default paper.svg
     */
    icon_Doc: {
      type: String,
      default: 'paper.svg',
    },
    icon_Part: {
      type: String,
      default: 'eyeClick.svg',
    },
    to: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      title: 'Document Verification',
      subtitle: new Date(),
      datalist: {},
    }
  },
  mounted() {
    this.getData("all");
  },
  methods: {
    toPage(route) {
      
      this.$router.push(route)
      // Implement your navigation logic here using the 'route' prop
      // For example, you can use Vue Router to navigate to the specified route.
    },
      
    async getData(id) {
      try {
        const response = await this.$axios.get('https://bepssi.kunci.co.id/api/secure-documents/users');
        // console.log(JSON.stringify(response.data.player));
        this.datalist = response.data.data;
        if (id !== "all"){
          this.datalist = response.data.data.filter(e => {return e.id === id});
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  components: { TitleBar },
  layout: 'admin',
}
</script>
  