<!-- <template>
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
        subtitle: new Date(),
      }
    },
    
    methods: {
    },
  }
  </script>
   -->

<template>
  <div v-if="items">
    <title-bar is-controlbar :title="'Verifikasi Dokumen'"
      :subtitle="'Pada menu ini anda dapat melakukan verifikasi dokumen.'" />
    <!-- <control-bar v-model="search" :button-name="'Tambah Pengguna Baru'" /> -->
    <!-- data tabel -->
    <!-- {{ items }} -->
    <kunci-table :header-table="tableHeader" :data="items">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #action="{ item }">
        <kunci-button :dense="true" class="bg-success hover:bg-success-shade" @click="toDetail(item)">
          <img class="w-4" :src="'/eye.svg'" />
        </kunci-button>
      </template>
    </kunci-table>
    <!-- pagination -->
    <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" />

    <div class="w-full h-full">
      <ElementsModal v-model="modal.status" :title="modal.title" :key="'modal' + modal.key" :show="true">
      <iframe :src="url" class="w-full h-[470px]" frameborder="0" allowfullscreen="true"></iframe>
        <div class="mt-4 flex justify-center space-x-4">
          <button @click="acceptData"
            class="px-4 py-2 bg-success text-white rounded-lg hover:hover:bg-success-shade focus:outline-none focus:ring focus:ring-blue-200">
            Terima
          </button>
          <button @click="tolakDokumen"
            class="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-200">
            Tolak
          </button>
        </div>
        <!-- </div> -->
      </ElementsModal>

    </div>
  </div>
</template>
  
<script>
import ControlBar from '~/components/ControlBar.vue'
import KunciTable from '~/components/KunciTable.vue'
import Pagination from '~/components/Pagination.vue'
import TitleBar from '~/components/TitleBar.vue'

export default {
  components: { TitleBar, ControlBar, KunciTable, Pagination },
  layout: 'admin',
  data() {
    return {

      title: 'Document Verification',
      subtitle: new Date(),
      fileType: "pdf",
      fileTerpilih: null,
      datalist: {},
      activeFilterId: null, // variabel untuk melacak ID filter aktif
      modal: {
        status: false,
        title: '{Detail File}',
        key: 0,
      },
      url: "",
      item: {},
      tableHeader: [
        {
          text: 'No',
          key: 'no',
        },
        {
          text: 'Nama Pengirim',
          key: 'username',
        },
        {
          text: 'Nama Dokumen',
          key: 'name',
        },
        {
          text: 'Telepon',
          key: 'phone_number',
        },
        {
          text: 'Status',
          key: 'status',
        },
        {
          text: 'Aksi',
          key: 'action',
        },
      ],
      pagination: {
        current_page: 1,
        first_page_url: '',
        from: 1,
        last_page: 1,
        last_page_url: '',
        next_page_url: null,
        path: '',
        per_page: 10,
        prev_page_url: null,
        to: 2,
        total: 0,
      },
      search: null,
      items: null,
    }
  },
  watch: {
    pagination: {
      handler() {
        this.fetchData(this.pagination.current_page)
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchData(this.pagination.current_page)
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // for pagination
    paginate(e) {
      this.pagination.current_page = e
    },
    async terimaDokumen() {
      try {
        const config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'https://bepssi.kunci.co.id/sanctum/csrf-cookie',
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JlcHNzaS5rdW5jaS5jby5pZC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTY5NTc5NzIxNywibmJmIjoxNjk1Nzk3MjE3LCJqdGkiOiI4Qmh3d3RoaHdISmtRYXpEIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.eplSXLlhUeHHJW7O_XLCnwvMosBxZRgsOMKa3vG57rE',
            'Content-Type': 'application/json'
          },
        };

        await this.$axios.request(config)
          .then((response) => {
            this.acceptData(this.fileTerpilih)
          })
          .catch((error) => {
            console.log(error);
          });

      } catch (error) {
        console.error(error);
      }
    },
    async acceptData() {
      try {
        console.log("X")
        const dataVerifikasi = { 'status': '1' }
        const config = {
          method: 'patch',
          maxBodyLength: Infinity,
          url: 'https://bepssi.kunci.co.id/api/secure-documents/' + this.fileTerpilih + '/update',
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JlcHNzaS5rdW5jaS5jby5pZC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTY5NTc5NzIxNywibmJmIjoxNjk1Nzk3MjE3LCJqdGkiOiI4Qmh3d3RoaHdISmtRYXpEIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.eplSXLlhUeHHJW7O_XLCnwvMosBxZRgsOMKa3vG57rE',
            // 'Cookie': 'XSRF-TOKEN=eyJpdiI6IjkxSno0TDdqZ0Y5d200dFRnRVErQkE9PSIsInZhbHVlIjoiL3ZUa05wWVJ4cXhuR3lmbHZBZ0tjWjJlUGZkUXJBa1hSWnY2azJkZGYxV3cydFVTY0ZnMWxROGM0QTBydWtIeHVINnJQaTl6ZEVnaXBwWXFXVHlBcEo3bU12Q3lTdkRNTzB3azlpbVZOS0tGVHZucG1kNXVTeE4vZkowYlFaOG0iLCJtYWMiOiJiMGQ5NjE1ZjgwYzRhNjgwY2FkYjg3ZDhhMGE1MDY3Y2ZiOTViNmY5MDgzYjU0NTY0N2MxMjY2YTJkZGQ3MGRjIiwidGFnIjoiIn0%3D; prima_academy_dev_session=eyJpdiI6ImhueTFCZzhMS1lURzFMQk1wbU5DUnc9PSIsInZhbHVlIjoiZ2RTT0VLNlYzYlVMcWx1bW5DTmFhbXNKYUVTTCtQZ3RNanBpOHI1SUo5VEtyV3ZtM2JLUmxTMTVGSWMwSWpZRG9PT3ptTkNzSGhhMUtqb2lQUWhRREx0dGRyZzV5MGxKQytkRkZYdHFCSGcxdXNoR3h3eWU1UmZFRWxnZ25jU2oiLCJtYWMiOiI3NGU5ODNjYzhjNWJjMGE1NzA1YmJiZGZjMzJmMWFlMzcwMjk3N2M5MmZjNzljMjg1MzUxNDRmMDk2ZmI3Y2QxIiwidGFnIjoiIn0%3D',
            'Content-Type': 'application/json'
          },
          data: dataVerifikasi
        };

        await this.$axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            // Setelah permintaan berhasil, arahkan pengguna kembali ke halaman saat ini
            this.$router.push({ path: this.$route.path });
          })
          .catch((error) => {
            console.log(error);
          });

      } catch (error) {
        console.error(error);
      }
    },
    async tolakDokumen() {
      try {
        console.log("X")
        const dataVerifikasi = { 'status': '2' }
        const config = {
          method: 'patch',
          maxBodyLength: Infinity,
          url: 'https://bepssi.kunci.co.id/api/secure-documents/' + this.fileTerpilih + '/update',
          headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JlcHNzaS5rdW5jaS5jby5pZC9hcGkvYXV0aC9sb2dpbiIsImlhdCI6MTY5NTc5NzIxNywibmJmIjoxNjk1Nzk3MjE3LCJqdGkiOiI4Qmh3d3RoaHdISmtRYXpEIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.eplSXLlhUeHHJW7O_XLCnwvMosBxZRgsOMKa3vG57rE',
            // 'Cookie': 'XSRF-TOKEN=eyJpdiI6IjkxSno0TDdqZ0Y5d200dFRnRVErQkE9PSIsInZhbHVlIjoiL3ZUa05wWVJ4cXhuR3lmbHZBZ0tjWjJlUGZkUXJBa1hSWnY2azJkZGYxV3cydFVTY0ZnMWxROGM0QTBydWtIeHVINnJQaTl6ZEVnaXBwWXFXVHlBcEo3bU12Q3lTdkRNTzB3azlpbVZOS0tGVHZucG1kNXVTeE4vZkowYlFaOG0iLCJtYWMiOiJiMGQ5NjE1ZjgwYzRhNjgwY2FkYjg3ZDhhMGE1MDY3Y2ZiOTViNmY5MDgzYjU0NTY0N2MxMjY2YTJkZGQ3MGRjIiwidGFnIjoiIn0%3D; prima_academy_dev_session=eyJpdiI6ImhueTFCZzhMS1lURzFMQk1wbU5DUnc9PSIsInZhbHVlIjoiZ2RTT0VLNlYzYlVMcWx1bW5DTmFhbXNKYUVTTCtQZ3RNanBpOHI1SUo5VEtyV3ZtM2JLUmxTMTVGSWMwSWpZRG9PT3ptTkNzSGhhMUtqb2lQUWhRREx0dGRyZzV5MGxKQytkRkZYdHFCSGcxdXNoR3h3eWU1UmZFRWxnZ25jU2oiLCJtYWMiOiI3NGU5ODNjYzhjNWJjMGE1NzA1YmJiZGZjMzJmMWFlMzcwMjk3N2M5MmZjNzljMjg1MzUxNDRmMDk2ZmI3Y2QxIiwidGFnIjoiIn0%3D',
            'Content-Type': 'application/json'
          },
          data: dataVerifikasi
        };

        await this.$axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            // Setelah permintaan berhasil, arahkan pengguna kembali ke halaman saat ini
            this.$router.push({ path: this.$route.path });
          })
          .catch((error) => {
            console.log(error);
          });

      } catch (error) {
        console.error(error);
      }
    },

    // fetch data
    async fetchData(currentPage) {
      await this.$axios
        .$get('https://bepssi.kunci.co.id/api/secure-documents/users', {
          params: {
            page: currentPage || this.pagination.current_page,
            search: this.search,
            limit: this.pagination.per_page,
          },
        })
        .then((res) => {
          if (res) {
            this.items = _.flatMap(res.data, function (e) {
              _.flatMap(e.secure_documents, function (f) {
                f.username = e.username
                f.phone_number = e.phone_number
                f.status = f.status.name
              })
              return e.secure_documents
            })
            this.res.data.forEach(e => {
              e.role = e.user_type === 1 ? "Official" :
                e.user_type === 2 ? "Pemain" : e.user_type === 3 ? "Club" : ""
            })
            this.pagination.current_page = 1
            this.pagination.total = this.items.length
            this.pagination.last_page = this.items.length
          }
        })
    },

    // to detail
    toDetail(e) {
      this.modal.title = e.name;
      this.fileTerpilih = e.id
      this.url = `http://localhost:4000/proxy?url=${encodeURIComponent(e.file)}`; // Update the URL to use the proxy
      this.fileType = "pdf";
      this.modal.status = true;
      this.modal.key += 1;
    },
  },
}
</script>
  
<style></style>
  