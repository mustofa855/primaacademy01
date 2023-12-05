<template>
    <div v-if="dataMurid">
        <!-- {{ dataMurid }} -->
        <title-bar :title="title" />
        <h1 class="text-2xl font-semibold">Halaman List Dokumen </h1>
        <table class="w-full border-collapse">
            <link href="https://fonts.googleapis.com/css2?family=Your+Selected+Font&display=swap" rel="stylesheet">
            <thead>
                <tr class="bg-gray-100">
                    <th class="py-2 px-4 text-left">id</th>
                    <th class="py-2 px-4 text-left">npm</th>
                    <th class="py-2 px-4 text-left">nama</th>
                    <th class="py-2 px-4 text-left">Tanggal Lahir</th>
                    <th class="py-2 px-4 text-left">Jenis Kelamin</th>
                    <th class="py-2 px-4 text-left">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {{ dataMurid.id }}
                    </td>
                    <td>
                        {{ dataMurid.npm }}
                    </td>
                    <td>
                        {{ dataMurid.nama }}
                    </td>
                    <td>
                        {{ dataMurid.tanggal_lahir }}
                    </td>
                    <td>
                        {{ dataMurid.jenis_kelamin }}
                    </td>
                    <td class="py-2 px-4">
                        <button class="text-blue-500 mr-2"  @click="toPage('/verification/doc-list/doc-list_ID/doc-verify/'+dataMurid.id)">
                            <img :src="(`/${icon_Part}`)" class="m-auto w-8" />
                        </button>
                    </td>
                </tr>
                <!-- <tr v-for="(item, index) in datalist" :key="index" class="border-t">
                    <td class="py-2 px-4">{{item.id}}</td>
                    <td class="py-2 px-4">{{item.nama}}</td>
                    <td class="py-2 px-4">{{item.tanggal_lahir}}</td>
                    <td class="py-2 px-4">
                        <button class="text-blue-500 mr-2"  @click="toPage('/verification/doc-list/doc-list_ID/doc-verify/'+item.id)">
                            <img :src="(`/${icon_Part}`)" class="m-auto w-8" />
                        </button>
                    </td>
                </tr> -->
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
      dataMurid: null,
      dataretrieve: null,
        dokumen:[
          {
            id:1,
            userId:'045067fd-e488-4bf2-9726-93f53a4f2909',
            linkDokumen: 'https://docs.google.com/document/d/1PZPdkXr3nqFFfdAh2MRzWMHPxlkZ9ueXtuR5RepwH4o/edit?usp=sharing'
          },
          {
            id:1,
            userId:'045067fd-e488-4bf2-9726-93f53a4f2909',
            linkDokumen: 'https://docs.google.com/document/d/1PZPdkXr3nqFFfdAh2MRzWMHPxlkZ9ueXtuR5RepwH4o/edit?usp=sharing'
          },
          {
            id:1,
            userId:'045067fd-e488-4bf2-9726-93f53a4f2909',
            linkDokumen: 'https://docs.google.com/document/d/1PZPdkXr3nqFFfdAh2MRzWMHPxlkZ9ueXtuR5RepwH4o/edit?usp=sharing'
          }
        ]
    }
  },
    computed: {
        id () {
            return this.$route.params.id
        }
    },
    created() {

    },
  mounted() {
    this.getData();
  },
  methods: {
    toPage(route) {
      
      this.$router.push(route)
      // Implement your navigation logic here using the 'route' prop
      // For example, you can use Vue Router to navigate to the specified route.
    },
    
      
    async getData() {
        try {
          const response = await this.$axios.get('https://ppm-api.gusdya.net/api/mahasiswa/'+this.id);
          console.log(JSON.stringify(response.data));
          this.dataMurid = response.data.data
        } catch (error) {
          console.error(error);
        }
      },
  },
  components: { TitleBar },
  layout: 'admin',
}
</script>
  