<template>
  <div class="grid grid-cols-6 h-screen <sm:grid-cols-1 <sm:grid-cols-1">
    <!-- illustratio section -->
    <div class="col-span-4 flex flex-1 bg">
      <!-- <div class="my-auto mx-16">
        <img :src="('./loginimage.svg')" alt="Logo Kunci" class="my-4 mx-4" />
        <div class="mx-4 text-white">
          <div class="font-bold text-6xl my-8 max-w-4xl">
            <div>Selamat Datang Di</div>
            <div>Kunci Tranformasi Digital</div>
          </div>
          <div class="text-4xl font-light my-8">Tempat dimana anda bisa mengelola akun anda</div>
        </div>
      </div>-->
    </div>

    <!-- form section -->
    <div class="col-span-2 p-4 px-14 flex flex-col">
      <!-- bagian form dan logo -->
      <div class="my-auto">
        <!-- logo section -->
        <div class="flex flex-1 mb-8">
          <img :src="'/logo-prima.svg'" alt="Kunci Transformasi Digital" class="max-w-52 mx-auto" />
        </div>

        <!-- title section -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 pb-2">
            Selamat Datang di Prima Academy
          </h1>
          <p class="text-justify">
            Selamat datang di Prima Academy. Silahkan login dengan akun masing-
            masing dibawah!
          </p>
        </div>

        <div class="flex flex-col">
          <button type="submit"
            class="bg-primary px-6 !block text-white p-4 rounded-lg hover:bg-primary-shade transition duration-300 ease-out" @click="toPage('/login')">
            Masuk
          </button>
        </div>

        <!-- form sectionn -->
        <!-- <div class="mx-auto max-w-96">
          <form @submit.prevent="login">
            <FormulateInput
              v-model="loginData.username"yarn
              label="Username"
              type="text"
              placeholder="username"
              validation="required"
            />
            <FormulateInput
              v-model="loginData.password"
              label="Password"
              type="password"
              placeholder="*******"
              validation="required|min:6,length"
              validation-name="Password"
            />
            <div class="flex flex-row justify-between font-semibold my-4">
              <div>Ingatkan Password</div>
              <div class="hover:cursor-pointer" @click="forgetPass">
                Lupa Password?
              </div>
            </div>
            
          </form>
        </div> -->
      </div>
      <div class="text-center">Copyright Prima Academy 2022</div>
    </div>
  </div>
</template>

<script>
export default {
  // auth: false,

  data() {
    return {
      env: process.env.baseUrl,
      loginData: {
        username: null,
        password: null,
      },
    }
  },

  methods: {
    toPage(route) {
      
      this.$router.push(route)
      // Implement your navigation logic here using the 'route' prop
      // For example, you can use Vue Router to navigate to the specified route.
    },
  }
  // methods: {
  //   // login() {
  //   //   this.$auth
  //   //     .loginWith('local', { data: this.loginData })
  //   //     .then(({ data }) => {
  //   //       // this.$store.commit('role/SET_ROLE', 1)
  //   //       // this.$auth.fetchUser()
  //   //       this.$store.commit('roleManagement/setRole', data.data.roles)
  //   //       this.$router.push('/dashboard')
  //   //     })
  //   //     .catch((err) => {
  //   //       // sweet alert
  //   //       this.$swal.fire({
  //   //         title: 'Gagal',
  //   //         text: err.response.data.message,
  //   //         icon: 'error',
  //   //         confirmButtonText: 'Oke',
  //   //       })
  //   //     })
  //   // },
  //   // forgetPass() {
  //   //   // swal
  //   //   this.$swal.fire({
  //   //     title: 'Lupa Password?',
  //   //     text: 'Relax dan tenang, coba untuk menarik napas dan mengingat kembali password anda 😉',
  //   //     icon: 'info',
  //   //     confirmButtonText: 'Oke',
  //   //   })
  //   // },
  // },
}
</script>

<style scoped>
.bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('./static/loginimage.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>
