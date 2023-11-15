<template>
  <nav
    class="h-screen w-64 overflow-hidden bg-white rounded-tr-md rounded-br-md shadow-card z-10 fixed top-0 group transition-all duration-200 ease-out shadow-lg">
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
      <router-link v-for="(item, index) in slug" :key="index" :to="item.to"
        class="flex flex-row items-center hover:text-primary transition duration-200 ease-out my-4 hover:border-primary after:absolute after:-right-4 after:h-10 after:w-6 after:rounded-md hover:after:bg-primary hover:after:transition-all after:duration-200 after:ease-out"
        :class="isActive == item.to ? 'text-primary after:bg-primary' : ''">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="max-w-xs flex mr-8 ml-4" v-html="item.icon"></div>
        <div :to="item.to" class="py-2 text-base transition-all ease-out duration-200 flex group"
          :class="$route.path == item.to ? 'after:bg-primary' : ''">
          {{ item.text }}
          <!-- <div
            class="absolute -right-4 h-10 w-6 rounded-md group-hover:bg-danger transition"
            :class="$route.path == item.to ? 'bg-primary' : ''"
          ></div>-->
        </div>
      </router-link>
    </div>

    <!-- footer -->
    <div class="flex flex-col px-4 py-2 gap-4 text-gray-400 font-medium bottom-0 absolute w-full">
      <!-- role management  -->
      <div class="flex flex-col gap-4 items-center relative group">
        <!-- role management -->
        <div class="w-full cursor-pointer" @click="toggleRole">
          <div class="flex gap-4">
            <!-- avatar -->
            <div class="rounded-full bg-primary">
              <img :src="'/support.svg'" alt="profile" class="m-aut w-12" />
            </div>
            <!-- username and role -->
            <div class="flex flex-col">
              <div class="text-black font-semibold text-lg">
                {{ $store.state.roleManagement.roleName }}
              </div>
              <div>Role Dipilih</div>
            </div>
          </div>
        </div>

        <!-- role section -->
        <transition enter-from-class="transform opacity-0" enter-active-class="duration-200 ease-in"
          enter-to-class="opacity-100" leave-from-class="opacity-100" leave-active-class="duration-200 ease-out"
          leave-to-class="transform opacity-0">
          <div v-if="roleOptions" class="absolute -top-52 z-10 rounded-md shadow-dark shadow-md w-full p-2 bg-white">
            <ul class="flex flex-col gap-2">
              <li v-for="item in $store.state.roleManagement.roles" :key="item"
                class="cursor-pointer hover:bg-gray-200 p-2 transition-colors duration-200 ease-out"
                @click="changeRole(item)">
                {{ item.name }}
              </li>
            </ul>
          </div>
        </transition>
      </div>

      <!-- account management -->
      <div class="flex flex-col gap-4 items-center relative group">
        <!-- create profile -->
        <div class="w-full cursor-pointer" @click="toggleOpen">
          <div class="flex gap-4">
            <!-- avatar -->
            <div class="w-12 rounded-full">
              <img :src="'/default.png'" alt="profile" class="m-auto" />
            </div>
            <!-- username and role -->
            <div class="flex flex-col">
              <div class="text-black font-semibold text-lg">
                {{ $store.state.auth.user.username }}
              </div>
              <div>{{ $store.state.roleManagement.roleName }}</div>
            </div>
          </div>
        </div>

        <!-- setting section -->
        <transition enter-from-class="transform opacity-0" enter-active-class="duration-200 ease-in"
          enter-to-class="opacity-100" leave-from-class="opacity-100" leave-active-class="duration-200 ease-out"
          leave-to-class="transform opacity-0">
          <div v-if="isOpen" class="absolute -top-20 rounded-md shadow-dark shadow-md w-full p-2 bg-white">
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
        // {
        //   to: '/coach',
        //   text: 'Pelatih',
        //   icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm1.13 1.1c-.37-.06-.74-.1-1.13-.1c-.99 0-1.93.21-2.78.58A2.01 2.01 0 0 0 0 16.43V18h4.5v-1.61c0-.83.23-1.61.63-2.29zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2s-2 .9-2 2s.9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0 0 20 14c-.39 0-.76.04-1.13.1c.4.68.63 1.46.63 2.29V18H24v-1.57zm-7.76-2.78c-1.17-.52-2.61-.9-4.24-.9c-1.63 0-3.07.39-4.24.9A2.988 2.988 0 0 0 6 16.39V18h12v-1.61c0-1.18-.68-2.26-1.76-2.74zM8.07 16c.09-.23.13-.39.91-.69c.97-.38 1.99-.56 3.02-.56s2.05.18 3.02.56c.77.3.81.46.91.69H8.07zM12 8c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m0-2c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3z"></path></svg>',
        // },
        {
          to: '/users',
          text: 'Pengguna',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14.754 10c.966 0 1.75.784 1.75 1.75V15H16.5v1h-9v-3h.002v-1.25c0-.966.783-1.75 1.75-1.75h5.502ZM22 11.75A1.75 1.75 0 0 0 20.25 10h-3.375c.393.475.629 1.085.629 1.75V13H17.5v3h3.75a.75.75 0 0 0 .75-.75v-3.5ZM6.5 15h.002v-3.25l.009-.22a2.72 2.72 0 0 1 .62-1.53H3.75l-.144.006A1.75 1.75 0 0 0 2 11.75v3.5c0 .414.336.75.75.75H6.5v-1ZM12 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6Zm6.5 1a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5Zm-13 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5ZM2 17.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 .75.75v.5A3.75 3.75 0 0 1 18.25 22H5.75A3.75 3.75 0 0 1 2 18.25v-.5Z"/></svg>',
        },
        {
          to: '/class',
          text: 'Kelas',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"></path></svg>',
        },
        {
          to: '/verification',
          text: 'Verifikasi',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',
        },
        // {
        //   to: '/registration',
        //   text: 'Pendaftaran',
        //   icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M19.5 5.5v13h-2v-13h2m-7 5v8h-2v-8h2m-7 5v3h-2v-3h2M21 4h-5v16h5V4m-7 5H9v11h5V9m-7 5H2v6h5v-6z" fill="currentColor"></path></svg>',
        // },
        // {
        //   to: '/assessment',
        //   text: 'Asesmen',
        //   icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 9h5.5L16 3.5V9M7 2h10l6 6v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2M3 6v16h18v2H3a2 2 0 0 1-2-2V6h2z" fill="currentColor"></path></svg>',
        // },
        // {
        //   to: '/master-data',
        //   text: 'Data Master',
        //   icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--mdi" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M16 0H8C6.9 0 6 .9 6 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6l-6-6m4 18H8V2h7v5h5v11M4 4v18h16v2H4c-1.1 0-2-.9-2-2V4h2m6 6v2h8v-2h-8m0 4v2h5v-2h-5z" fill="currentColor"></path></svg>',
        // },
      ],
      isOpen: false,
      roleOptions: false,
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
    async logout() {
      try {
        await this.$axios.post('/api/auth/logout/');
        this.$router.push('/login'); // Ganti '/login' dengan rute halaman login yang sesuai
      } catch (err) {
        console.log('gagal');
        console.log(err);
      }
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
      this.logout(); // Panggil metode logout setelah pengguna menekan "Ya"
    }
  })
},

    toggleOpen() {
      this.isOpen = !this.isOpen
    },
    toggleRole() {
      this.roleOptions = !this.roleOptions
    },
    changeRole(e) {
      this.$store.commit('roleManagement/changeRole', e)
      this.toggleRole()
      this.$axios.$post(`role/update-exist/`, { role_id: e.id }).then(() => {
        this.$swal({
          title: 'Berhasil',
          text: 'Anda berhasil mengubah role',
          type: 'success',
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
        })
      })
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
