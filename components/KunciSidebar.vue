<template>
  <nav
    class="h-screen w-64 overflow-hidden bg-white rounded-tr-md rounded-br-md shadow-card z-10 fixed top-0 group transition-all duration-200 ease-out shadow-lg"
  >
    <!-- image title -->
    <div class="flex flex-col px-5 py-2"></div>

    <!-- menu -->
    <div class="flex flex-col px-4 py-2 text-gray-400 font-medium">
      <!-- logo  -->
      <div class="flex flex-1 items-center mb-4">
        <img :src="('/kunci_logo_h.svg')" alt="Kunci Transformasi Digital" class="m-auto" />
        <!-- <div
          class="opacity-0 mx-auto group-hover:opacity-100 transition-opacity ease-out duration-120"
        >
          <img :src="('/kuci_logo_v.svg')" alt="Kunci Transformasi Digital" />
        </div>-->
      </div>
      <!-- link -->
      <router-link
        v-for="(item, index) in slug"
        :key="index"
        :to="item.to"
        class="flex flex-row items-center hover:text-primary transition duration-200 ease-out my-4 hover:border-primary after:absolute after:-right-4 after:h-10 after:w-6 after:rounded-md hover:after:bg-primary hover:after:transition-all after:duration-200 after:ease-out"
        :class="isActive == item.to ? 'text-primary after:bg-primary' : ''"
      >
        <div class="max-w-xs flex mr-8 ml-4" v-html="item.icon"></div>
        <div
          :to="item.to"
          class="py-2 text-base transition-all ease-out duration-200 flex group"
          :class="$route.path == item.to ? 'after:bg-primary' : ''"
        >
          {{ item.text }}
          <!-- <div
            class="absolute -right-4 h-10 w-6 rounded-md group-hover:bg-danger transition"
            :class="$route.path == item.to ? 'bg-primary' : ''"
          ></div>-->
        </div>
      </router-link>
    </div>

    <!-- footer -->
    <div class="flex flex-col px-4 py-2 text-gray-400 font-medium bottom-0 absolute w-full">
      <div class="flex flex-col items-center mb-4">
        <kunci-button class="w-full" @click="modalLogout">Logout</kunci-button>
      </div>
    </div>
  </nav>
</template>

<script>
import KunciButton from './KunciButton.vue'
export default {
  components: { KunciButton },
  data() {
    return {
      slug: [{
        to: '/dashboard',
        text: 'Dashboard',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" fill="currentColor"></path></svg>',
      }, {
        to: '/registration',
        text: 'Pendaftaran',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19.5 5.5v13h-2v-13h2m-7 5v8h-2v-8h2m-7 5v3h-2v-3h2M21 4h-5v16h5V4m-7 5H9v11h5V9m-7 5H2v6h5v-6z" fill="currentColor"></path></svg>',
      }, {
        to: '/assessment',
        text: 'Asesmen',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 9h5.5L16 3.5V9M7 2h10l6 6v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2M3 6v16h18v2H3a2 2 0 0 1-2-2V6h2z" fill="currentColor"></path></svg>',
      }, {
        to: '/master-data',
        text: 'Data Master',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 0H8C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6l-6-6m4 18H8V2h7v5h5v11M4 4v18h16v2H4c-1.1 0-2-.9-2-2V4h2m6 6v2h8v-2h-8m0 4v2h5v-2h-5z" fill="currentColor"></path></svg>',
      },]
    }
  },
  computed: {
    isActive() {
      const split = this.$route.path.split('/')
      return '/' + split[1]
    }
  },
  mounted() {
    // // eslint-disable-next-line no-console
    // console.log(this.$route);
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
    modalLogout() {
      // show modal swal
      this.$swal({
        title: 'Keluar dari aplikasi',
        text: 'Apakah anda yakin ingin keluar dari aplikasi ini?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Tidak',
        reverseButtons: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        focusCancel: true,
        preConfirm: () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve()
            }, 200)
          })
        },
      }).then((result) => {
        if (result.value) {
          this.logout()
        }
      })
    }
  }
}
</script>
<style scoped>
.garis::after {
  /* @apply after:absolute after:-right-4 after:h-10 after:w-6 after:rounded-md hover:after:bg-primary hover:after:transition-all after:duration-200 after:ease-out after:bg-primary; */
  content: "";
  position: absolute;
  right: -24px;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  transition: all;
  background-color: blue;
  animation-duration: 200ms;
  animation-timing-function: ease-out;
}
</style>
