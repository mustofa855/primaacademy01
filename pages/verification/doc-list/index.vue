<template>
  <div>
    <!-- Title Bar -->
    <title-bar is-controlbar :title="'Verifikasi Dokumen'"
      :subtitle="'Pada menu ini anda dapat melakukan verifikasi dokumen.'" />

    <!-- Tombol Tampilkan Semua Dokumen -->
    <div class="flex justify-between mb-4">
      <tombol-button @click="$router.push('/verification')" class="bg-success text-white kembali-button">
        Kembali
      </tombol-button>
      <button @click="toggleShowAll"
        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring focus:ring-blue-200">
        {{ showAll ? 'Tampilkan Dokumen yang Belum Diverifikasi' : 'Tampilkan Semua Dokumen' }}
      </button>
    </div>

    <!-- Table Content -->
    <tabel :header-table="tableHeader" :data="paginatedDocuments">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #status_doc="{ item }">{{ getStatusText(item.status_doc) }}</template>
      <template #action="{ item }">
        <tombol-button :dense="true" class="bg-success hover:bg-success-shade" @click="toDetail(item)">
          <img class="w-4" :src="'/eye.svg'" />
        </tombol-button>
      </template>
    </tabel>

    <!-- pagination -->
    <pagination :pagination="pagination" @paginate="paginate" />

    <!-- Modal -->
    <transition name="modal">
      <div v-if="modal.show" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <ElementsModal v-model="modal.show" :title="modal.title" :key="'modal' + modal.key" :username="modal.username">
          <div class="flex justify-between items-center mb-4">
            <p class="mt-4 text-2xl text-black text-center">NIK: {{ modal.nik }}</p>
            <button @click="modal.show = false" class="text-gray-400 hover:text-gray-600 focus:outline-none">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <iframe v-if="modal.url" :src="modal.url" class="w-full h-[570px]" frameborder="0"
            allowfullscreen="true"></iframe>
          <div v-if="modal.statusDokumen === 'Menunggu'" class="mt-4 flex justify-center space-x-4">
            <button @click="confirmAccept"
              class="px-4 py-2 bg-success text-white rounded-lg hover:bg-success-shade focus:outline-none focus:ring focus:ring-blue-200">
              Terima
            </button>
            <button @click="confirmReject"
              class="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-200">
              Tolak
            </button>
          </div>
        </ElementsModal>
      </div>
    </transition>
  </div>
</template>


<script>
import Swal from 'sweetalert2';
import TitleBar from '~/components/TitleBar.vue';
import Tabel from '~/components/Tabel.vue';
import TombolButton from '~/components/TombolButton.vue';
import Pagination from '~/components/Pagination.vue';

export default {
  components: { TitleBar, Tabel, TombolButton, Pagination },
  layout: 'admin',
  data() {
    return {
      documents: [],
      showAll: false, // State untuk menentukan mode tampilan dokumen
      tableHeader: [
        { text: 'No', key: 'no' },
        { text: 'Nama pengirim', key: 'fullname' },
        { text: 'Nama Dokumen', key: 'name_document' },
        { text: 'NIK', key: 'nik_user' },
        { text: 'No.Telepon', key: 'phone_number' },
        { text: 'Status', key: 'status_doc' },
        { text: 'Aksi', key: 'action' },
      ],
      pagination: {
        current_page: 1,
        from: 1,
        to: 10,
        per_page: 10,
        total: 0,
        last_page: 1,
      },
      modal: {
        show: false,
        title: '',
        key: 0,
        username: '',
        nik: '',
        url: '',
        statusDokumen: '',
      },
      filteredDocumentsCount: 0, // State untuk menyimpan jumlah dokumen yang difilter
    }
  },
  watch: {
    pagination: {
      handler() {
        this.updatePagination();
      },
      deep: true,
    },
  },
  async fetch() {
    try {
      const response = await this.$axios.$get('https://6672a1756ca902ae11b1155d.mockapi.io/api/secure-documents');
      this.documents = response;
      this.updateFilteredDocumentsCount();
      this.pagination.total = this.filteredDocumentsCount;
      this.pagination.last_page = Math.ceil(this.filteredDocumentsCount / this.pagination.per_page);
      this.updatePagination();
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  },
  computed: {
    filteredDocuments() {
      const filtered = this.showAll
        ? this.documents
        : this.documents.filter(doc => doc.status_doc !== 1 && doc.status_doc !== 2);
      this.filteredDocumentsCount = filtered.length;
      return filtered;
    },
    paginatedDocuments() {
      const start = (this.pagination.current_page - 1) * this.pagination.per_page;
      const end = this.pagination.current_page * this.pagination.per_page;
      return this.filteredDocuments.slice(start, end);
    }
  },
  methods: {
    updatePagination() {
      this.pagination.from = (this.pagination.current_page - 1) * this.pagination.per_page + 1;
      this.pagination.to = Math.min(this.pagination.current_page * this.pagination.per_page, this.filteredDocumentsCount);
    },
    paginate(page) {
      this.pagination.current_page = page;
      this.updatePagination();
    },
    toggleShowAll() {
      this.showAll = !this.showAll;
      this.pagination.current_page = 1; // Reset ke halaman pertama saat mode tampilan berubah
      this.updateFilteredDocumentsCount();
      this.pagination.total = this.filteredDocumentsCount;
      this.pagination.last_page = Math.ceil(this.filteredDocumentsCount / this.pagination.per_page);
      this.updatePagination();
    },
    updateFilteredDocumentsCount() {
      this.filteredDocumentsCount = this.showAll
        ? this.documents.length
        : this.documents.filter(doc => doc.status_doc !== 1 && doc.status_doc !== 2).length;
    },
    toDetail(item) {
      this.modal.show = true;
      this.modal.title = 'Detail Dokumen ' + item.name_document;
      this.modal.key = item.id;
      this.modal.username = item.fullname;
      this.modal.nik = item.nik_user;
      this.modal.url = item.file_user.replace('view', 'preview'); // Ganti 'view' dengan 'preview'
      this.modal.statusDokumen = this.getStatusText(item.status_doc);
    },
    getStatusText(statusCode) {
      switch (statusCode) {
        case 1:
          return 'Diterima';
        case 2:
          return 'Ditolak';
        case 3:
          return 'Menunggu';
        default:
          return 'Tidak Diketahui';
      }
    },
    async updateDocumentStatus(id, status) {
      try {
        await this.$axios.$put(`https://6672a1756ca902ae11b1155d.mockapi.io/api/secure-documents/${id}`, { status_doc: status });
        const docIndex = this.documents.findIndex(doc => doc.id === id);
        if (docIndex !== -1) {
          this.$set(this.documents, docIndex, { ...this.documents[docIndex], status_doc: status });
        }
        this.modal.show = false;
        if (status === 1) {
          Swal.fire('Berhasil', 'Dokumen berhasil diterima', 'success');
        } else if (status === 2) {
          Swal.fire('Berhasil', 'Dokumen berhasil ditolak', 'success');
        }
        this.updateFilteredDocumentsCount();
        this.pagination.total = this.filteredDocumentsCount;
        this.pagination.last_page = Math.ceil(this.filteredDocumentsCount / this.pagination.per_page);
        this.updatePagination();
      } catch (error) {
        console.error('Error updating document status:', error);
      }
    },
    confirmAccept() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda yakin ingin menerima dokumen ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, terima!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.acceptData();
        }
      });
    },
    confirmReject() {
      Swal.fire({
        title: 'Apakah Anda yakin?',
        text: 'Anda yakin ingin menolak dokumen ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, tolak!',
        cancelButtonText: 'Batal',
      }).then((result) => {
        if (result.isConfirmed) {
          this.tolakDokumen();
        }
      });
    },
    acceptData() {
      this.updateDocumentStatus(this.modal.key, 1);
    },
    tolakDokumen() {
      this.updateDocumentStatus(this.modal.key, 2);
    },
  },
}
</script>




<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}

.button {
  margin-bottom: 10px;
}

.kembali-button:hover {
  background-color: #045C57;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s;
}

/* Kondisi awal dan akhir dari animasi */
.modal-enter, .modal-leave-to /* .modal-leave-active di versi Vue sebelumnya */ {
  opacity: 0;
}
</style>











<!-- <template>
  <div v-if="items">
    <title-bar is-controlbar :title="'Verifikasi Dokumen'"
      :subtitle="'Pada menu ini anda dapat melakukan verifikasi dokumen.'" />
    
 pagination -->
<!-- <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" />


    <div class="w-full h-full">
      <ElementsModal v-model="modal.status" :title="modal.title" :key="'modal' + modal.key" :show="true"
        :username="modal.username">
        <iframe :src="url" class="w-full h-[470px]" frameborder="0" allowfullscreen="true"></iframe>
        <div v-if="modal.statusDokumen !== 'Terverifikasi'" class="mt-4 flex justify-center space-x-4">
          <button @click="acceptData"
            class="px-4 py-2 bg-success text-white rounded-lg hover:hover:bg-success-shade focus:outline-none focus:ring focus:ring-blue-200">
            Terima
          </button>
          <button @click="tolakDokumen"
            class="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-200">
            Tolak
          </button>
        </div>
      </ElementsModal>

    </div>

  </div>
</template> -->

<!-- <script>
import ControlBar from '~/components/ControlBar.vue'
import Tabel from '~/components/Tabel.vue'
import Pagination from '~/components/Pagination.vue'

export default {
  components: { TitleBar, ControlBar, Tabel, Pagination },
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
        statusDokumen: 0,
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
  computed: {
    // Buat computed property untuk mengembalikan item yang belum terverifikasi atau ditolak
    filteredItems() {
      return _.filter(this.items, (item) => {
        return item.secure_documents.some(doc => doc.status.name === 'Menunggu');
      });
    },
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
            // Menampilkan pop-up dokumen diterima
            this.$swal({
              title: 'Data Terverifikasi',
              text: 'Data telah berhasil diverifikasi!',
              icon: 'success',
              button: 'OK'
            }).then(() => {
              // Setelah permintaan berhasil, arahkan pengguna kembali ke halaman saat ini
              this.$router.push({ path: this.$route.path });
            });

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
            // Menampilkan pop-up dokumen ditolak
            this.$swal({
              title: 'Dokumen Ditolak',
              text: 'Data telah berhasil ditolak!',
              icon: 'error',
              button: 'OK'
            }).then(() => {
              // Setelah permintaan berhasil, arahkan pengguna kembali ke halaman saat ini
              this.$router.push({ path: this.$route.path });
            });
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
            // .filter(e => {return e.status !== "Terverifikasi"})
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
      this.modal.statusDokumen = e.status;
      this.modal.key += 1;
      this.modal.username = e.username;
    },
  },
}
</script> -->

<!-- <style></style> -->