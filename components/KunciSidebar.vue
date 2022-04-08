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
        <img :src="'/logo-prima.svg'" alt="Prima Academy" class="m-auto" />
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
        <!-- eslint-disable-next-line vue/no-v-html -->
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
    <div
      class="flex flex-col px-4 py-2 text-gray-400 font-medium bottom-0 absolute w-full"
    >
      <div class="flex flex-col items-center mb-4 relative group">
        <!-- create profile -->
        <div class="w-full cursor-pointer" @click="toggleOpen">
          <div class="flex gap-4">
            <!-- avatar -->
            <div class="w-12 rounded-full">
              <img :src="'/default.png'" alt="profile" class="m-auto" />
            </div>
            <!-- username and role -->
            <div class="flex flex-col">
              <div>username</div>
              <div>role</div>
            </div>
          </div>
        </div>

        <!-- setting section -->
        <transition
          enter-from-class="transform opacity-0"
          enter-active-class="duration-200 ease-in"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-active-class="duration-200 ease-out"
          leave-to-class="transform opacity-0"
        >
          <div
            v-if="isOpen"
            class="absolute -top-20 rounded-md shadow-dark shadow-md w-full p-2"
          >
            <ul class="flex flex-col gap-2">
              <li class="cursor-pointer">Setting</li>
              <li class="cursor-pointer" @click="modalLogout">Logout</li>
            </ul>
          </div>
        </transition>
        <!-- <kunci-button class="w-full" @click="modalLogout">Logout</kunci-button> -->
      </div>
    </div>
  </nav>
</template>

<script>
// import KunciButton from './KunciB  utton.vue'
export default {
  // components: { KunciButton },
  data() {
    return {
      slug: [
        {
          to: '/dashboard',
          text: 'Dashboard',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M21 16H3V4h18m0-2H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" fill="currentColor"></path></svg>',
        },
        {
          to: '/coach',
          text: 'Pelatih',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1c-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1c.4.68.63 1.46.63 2.29V18H24v-1.57zm-7.76-2.78c-1.17-.52-2.61-.9-4.24-.9c-1.63 0-3.07.39-4.24.9A2.988 2.988 0 0 0 6 16.39V18h12v-1.61c0-1.18-.68-2.26-1.76-2.74zM8.07 16c.09-.23.13-.39.91-.69c.97-.38 1.99-.56 3.02-.56s2.05.18 3.02.56c.77.3.81.46.91.69H8.07zM12 8c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"></path></svg>',
        },
        {
          to: '/class',
          text: 'Kelas',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></svg>',
        },
        {
          to: '/registration',
          text: 'Pendaftaran',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19.5 5.5v13h-2v-13h2m-7 5v8h-2v-8h2m-7 5v3h-2v-3h2M21 4h-5v16h5V4m-7 5H9v11h5V9m-7 5H2v6h5v-6z" fill="currentColor"></path></svg>',
        },
        {
          to: '/assessment',
          text: 'Asesmen',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 9h5.5L16 3.5V9M7 2h10l6 6v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2M3 6v16h18v2H3a2 2 0 0 1-2-2V6h2z" fill="currentColor"></path></svg>',
        },
        {
          to: '/master-data',
          text: 'Data Master',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 0H8C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6l-6-6m4 18H8V2h7v5h5v11M4 4v18h16v2H4c-1.1 0-2-.9-2-2V4h2m6 6v2h8v-2h-8m0 4v2h5v-2h-5z" fill="currentColor"></path></svg>',
        },
      ],
      isOpen: false,
    }
  },
  computed: {
    isActive() {
      const split = this.$route.path.split('/')
      return '/' + split[1]
    },
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
    },
    toggleOpen() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>
<style scoped>
.garis::after {
  /* @apply after:absolute after:-right-4 after:h-10 after:w-6 after:rounded-md hover:after:bg-primary hover:after:transition-all after:duration-200 after:ease-out after:bg-primary; */
  content: '';
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
