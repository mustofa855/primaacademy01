<template>
    <div>
      <title-bar :title="title" />
      <h1 class="text-2xl font-semibold">Halaman Verifikasi Dokumen</h1>
  
      <!-- Card dengan Preview Dokumen -->
      <div class="mt-4 p-4 border rounded-lg shadow-md flex items-center justify-center">
        <div class="max-w-full max-h-64">
          <img :src="(`/${icon_Doc}`)" alt="Dokumen" class="max-w-full h-auto mx-auto" />
        </div>
      </div>
  
      <!-- Tombol Verifikasi -->
      <div class="mt-4 flex justify-center space-x-4">
        <button @click="terimaDokumen" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200">
          Terima
        </button>
        <button @click="tolakDokumen" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-200">
          Tolak
        </button>
      </div>
    </div>
  </template>
  
  
  <script>
  import TitleBar from '~/components/TitleBar.vue';
  
  export default {
    props: {
      icon_Doc: {
        type: String,
        // default: 'paper2.svg',
      },
      to: {
        type: String,
        default: '',
      },
    },
    methods: {
      toPage(route) {
        this.$router.push(route);
      },
      terimaDokumen() {
        // Implementasi logika untuk menerima dokumen di sini
        alert('Dokumen diterima.');
      },
      tolakDokumen() {
        // Implementasi logika untuk menolak dokumen di sini
        alert('Dokumen ditolak.');
      },
    },
    components: {
      TitleBar,
    },
    data() {
      return {
        title: 'Verifikasi Dokumen',
        subtitle: new Date(),
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  /* Gaya CSS untuk halaman verifikasi dokumen */
  .document-preview {
    margin: 20px 0;
    text-align: center;
  }
  
  .document-preview img {
    max-width: 100%;
    max-height: 300px;
  }
  
  .verification-buttons {
    text-align: center;
    margin-top: 20px;
  }
  
  .verification-buttons button {
    margin: 0 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  
  .verification-buttons button:hover {
    background-color: #0056b3;
  }
  </style>
  