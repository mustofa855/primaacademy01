<template>
  <div v-if="datalist">
    <pre>{{ datalist }}</pre>
    <title-bar :title="title" />
    <table class="w-full border-collapse">
      <thead>
        <tr class="bg-gray-100">
          <th class="py-2 px-4 text-left">ID</th>
          <th class="py-2 px-4 text-left">Nama Pengirim</th>
          <th class="py-2 px-4 text-left">Nama file</th>
          <th class="py-2 px-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in datalist" :key="index">
        <tr v-for="file in item.secure_documents" :key="file.id" class="border-t">
          <td class="py-2 px-4">{{ file.id }}</td>
          <td class="py-2 px-4">{{ item.username }}</td>
          <td class="py-2 px-4">{{ file.name }}.pdf</td>
          <td class="py-2 px-4">
            <button @click="openModal(file.file)" class="text-blue-500 mr-2" title="See Detail">
              <img :src="`/${icon_SeeDetail}`" class="m-auto w-8" />
            </button>
            <button class="Filter text-blue-500 mr-2" @click="getData(item.id)" title="Filter by Id User">
              <img :src="`/${item.id === activeFilterId ? icon_PartOff : icon_PartOn}`" class="m-auto w-8" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ElementsModal
          v-model="modal.status"
          :title="modal.title"
          :key="'modall'+modal.key"
          :width="modal.width"
          :show="true"
      >
          <!-- <div v-if="fileType==='pdf'">
              {{ url }}
              <ViewerPdf :path=url />
          </div> -->
          <!-- <div v-else-if="fileType==='av'">
              <ViewerAv 
                  :path="url"
              />
          </div> -->
          <!-- <div v-else-if="fileType==='audio'" class="bg-black flex items-center justify-center h-96">
              <audio controls autoplay>
                  <source :src="url" >
                  Your browser does not support the audio element.
              </audio>

          </div> -->
          <!-- <div class="p-5"> -->
            
            {{ url }}
              
            <iframe
              :src="url"
              width="100%"
              height="600"
              frameborder="0"
              allowfullscreen="true"
            ></iframe>
          <!-- </div> -->
      </ElementsModal>
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue'
export default {
  props: {
    icon_SeeDetail: {
      type: String,
      default: 'eyeClick.svg',
    },
    icon_PartOn: {
      type: String,
      default: 'FilterOn.svg',
    },
    icon_PartOff: {
      type: String,
      default: 'FilterOff.svg',
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
      fileType: "pdf",
      datalist: {},
      activeFilterId: null, // variabel untuk melacak ID filter aktif
      modal: {
          status: false,
          title: 'Detail File',
          key: 0,
          width: 'w-3/5'
      },
      url: "",
    }
  },
  mounted() {
    this.getData("all");
  },
  methods: {
    toPage(route) {
      this.$router.push(route);
    },
    async getData(id) {
      try {
        const response = await this.$axios.get('https://bepssi.kunci.co.id/api/secure-documents/users');
        this.datalist = response.data.data;
        if (id !== "all") {
          this.datalist = response.data.data.filter(e => e.id === id);
        }
        if (this.activeFilterId === id) {
          this.activeFilterId = null; // Kembalikan ikon ke ikon awal
          this.datalist = response.data.data;
        } else {
          this.activeFilterId = id; // Ganti ikon dengan ikon kedua
        }
      } catch (error) {
        console.error(error);
      }
      // Fungsi ini akan mengubah ikon filter saat tombol filter diklik

    },
    openModal(file){
      this.url = file
      this.fileType = "pdf"
      console.log(this.url)
      this.modal.status = true
      this.modal.key += 1
    }
  },
  components: { TitleBar },
  layout: 'admin',
}
</script>
