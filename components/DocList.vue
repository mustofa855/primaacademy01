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
            <button @click="openModal(file.file, file.name)" class="text-blue-500 mr-2" title="See Detail">
              <img :src="`/${icon_SeeDetail}`" class="m-auto w-8" />
            </button>
            <button class="Filter text-blue-500 mr-2" @click="getData(item.id)" title="Filter by Id User">
              <img :src="`/${item.id === activeFilterId ? icon_PartOff : icon_PartOn}`" class="m-auto w-8" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ElementsModal v-model="modal.status" :title="modal.title" :key="'modall' + modal.key" :width="modal.width"
      :show="true">
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

      <iframe :src="url" class="w-full h-5/6" frameborder="0" allowfullscreen="false"></iframe>
      <div class="mt-4 flex justify-center space-x-4">
        <button @click="terimaDokumen(item.id)"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
          Terima
        </button>
        <button @click="tolakDokumen"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200">
          Tolak
        </button>
      </div>
      <!-- </div> -->
    </ElementsModal>
  </div>
</template>

<script>
import axios from 'axios'
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
        title: '{Detail File}',
        key: 0,
        width: 'w-2/5',
        height: 'h-2/5'
      },
      url: "",
      item: {},
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
    async terimaDokumen(id) {
      try {
        // Kirim permintaan HTTP ke endpoint API untuk mengubah status verifikasi
        const response = await axios.put(`https://bepssi.kunci.co.id/api/users/${id}`, {
          verified: {
            id: 1,
            name: "Terverifikasi"
          }
        });
        // Periksa apakah permintaan berhasil
        if (response.status === 200) {
          // Tambahkan logika lain jika diperlukan setelah berhasil
          console.log(`Dokumen diterima untuk pengguna dengan ID ${id}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async tolakDokumen(id) {
      try {
        // Kirim permintaan HTTP ke endpoint API untuk menandai dokumen sebagai "Ditolak"
        const response = await axios.put(`https://bepssi.kunci.co.id/api/users/${id}`, {
          verified: {
            id: 2, // Ganti ID status sesuai dengan yang sesuai
            name: "Ditolak"
          }
        });
        // Periksa apakah permintaan berhasil
        if (response.status === 200) {
          // Tambahkan logika lain jika diperlukan setelah berhasil
          console.log(`Dokumen ditolak untuk pengguna dengan ID ${id}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
    openModal(file, name) {
      console.log("SINIIIIIII")
      this.modal.title = name;
      this.url = `http://localhost:4000/proxy?url=${encodeURIComponent(file)}`; // Update the URL to use the proxy
      this.fileType = "pdf";
      this.modal.status = true;
      this.modal.key += 1;
    }
  },


  components: { TitleBar },
  layout: 'admin',
}
</script>
