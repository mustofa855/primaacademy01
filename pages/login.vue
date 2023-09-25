<template>
  <div class="min-h-screen w-full bg flex items-center justify-center">
    <div>
      <card class="flex flex-col gap-4 p-8 px-16">
        <div>
          <kunci-button text @click="$router.push('/pendaftaran-asesmen')"
            >Kembali</kunci-button
          >
        </div>
        <!-- image section -->
        <div class="flex flex-1">
          <img
            :src="'/kuci_logo_v.svg'"
            alt="Kunci Transformasi Digital"
            class="max-w-52 mx-auto"
          />
        </div>
        <!-- title section -->
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 pb-2">
            Selamat Datang di
            <span class="text-primary">KunciLSP</span>
          </h1>
          <p class="text-justify text-gray-400">
            Selamat datang di
            <span class="text-primary">KunciLSP</span>. Silahkan login dengan
            akun masing - masing dibawah ini.
          </p>
        </div>
        <!-- form section -->
        <div>
          <form class="flex flex-col gap-4" @submit.prevent="login">
            <FormulateInput
              v-model="items.username"
              type="text"
              label="Username"
              placeholder="Username"
              validation="required"
              error-behavior="live"
            />
            <FormulateInput
              v-model="items.password"
              type="password"
              label="Password"
              placeholder="Password"
              validation="required|min:8,length"
              error-behavior="live"
            />
            <!-- lupa password -->
            <div class="flex flex-row justify-between">
              <div class="flex flex-row gap-2 justify-center items-center">
                <input type="checkbox" value="true" />Ingatkan Password
              </div>
              <div class="hover:cursor-pointer" @click="forgetPass">
                Lupa Password?
              </div>
            </div>
            <kunci-button type="submit">Login</kunci-button>
          </form>
        </div>
        <template #actions>
          <div
            class="flex items-center justify-center mt-8 italic text-gray-400"
          >
            Copyright Kunci Transformasi Digital 2021
          </div>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card.vue'
import KunciButton from '~/components/KunciButton.vue'
export default {
  components: { Card, KunciButton },
  auth: false,
  data() {
    return {
      items: { username: '', password: '' },
    }
  },
  methods: {
    login() {
      console.log("ini")
      this.$router.push('/dashboard')
      // this.$auth
      //   .loginWith('participant', { data: this.items })
      //   .then(() => {
      //     this.$router.push('/dashboard')
      //   })
      //   .catch((err) => {
      //     const error = this.$errorMessages(err.response.data.errors)
      //     // sweet alert
      //     this.$swal.fire({
      //       title: 'Gagal',
      //       html: error,
      //       icon: 'error',
      //       confirmButtonText: 'Oke',
      //     })
      //   })
    },
    forgetPass() {
      // swal
      this.$swal.fire({
        title: 'Lupa Password?',
        text: 'Relax dan tenang, coba untuk menarik napas dan mengingat kembali password anda 😉',
        icon: 'info',
        confirmButtonText: 'Oke',
      })
    },
  },
}
</script>

<style scoped>
.bg {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('./static/loginimage.jpg');
  background-size: cover;
  background-position: center;
}
</style>
