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
          <img
            :src="'/kuci_logo_v.svg'"
            alt="Kunci Transformasi Digital"
            class="max-w-52 mx-auto"
          />
        </div>

        <!-- title section -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-gray-900 pb-2">
            Selamat Datang di
            <span class="text-primary">KunciLSP</span>
          </h1>
          <p class="text-justify">
            Selamat datang di
            <span class="text-primary">KunciLSP</span>. Silahkan login dengan
            akun masing - masing dibawah ini.
          </p>
        </div>

        <!-- form sectionn -->
        <div class="mx-auto max-w-96">
          <form @submit.prevent="login">
            <FormulateInput
              v-model="loginData.username"
              label="Username"
              type="text"
              placeholder="username"
              validation="required"
              outer-class="mb-4"
              label-class="font-semibold"
              input-class="border border-gray-400 rounded px-3 py-2 leading-none focus:border-primary outline-none border-box w-full duration-200 ease-out transition"
              errors-class="text-danger"
            />
            <FormulateInput
              v-model="loginData.password"
              label="Password"
              type="password"
              placeholder="*******"
              validation="required|min:6,length"
              validation-name="Password"
            />
            <!-- bagian ingat password dan lupa pass -->
            <div class="grid grid-cols-2 font-semibold my-4">
              <div>Ingatkan Password</div>
              <div class="text-right">Lupa Password?</div>
            </div>

            <!-- button login -->
            <div class="flex flex-col">
              <button
                type="submit"
                class="bg-primary px-6 !block text-white p-4 rounded-lg hover:bg-primary-shade transition duration-300 ease-out"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- bagian author -->
      <div class="text-center">Copyright Kunci Transformasi Digital 2021</div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,

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
    login() {
      this.$auth
        .loginWith('local', { data: this.loginData })
        .then((res) => {
          // eslint-disable-next-line no-console
          console.log(res.data)
          this.$router.push('/dashboard')
        })
        .catch((err) => {
          // sweet alert
          this.$swal.fire({
            title: 'Gagal',
            text: err.response.data.message,
            icon: 'error',
            confirmButtonText: 'Oke',
          })
        })
    },
  },
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
