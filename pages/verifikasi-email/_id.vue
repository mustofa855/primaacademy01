<template>
  <div class="h-screen w-full flex items-center justify-center">
    <div>
      <loading />
    </div>
  </div>
</template>

<script>
export default {
  auth: false, // <-- set to true to require authentication
  mounted() {
    this.verification()
  },
  methods: {
    redirect() {
      // setting timeout
      setTimeout(() => {
        this.$router.push({ name: 'login' })
      }, 10000)
    },

    verification() {
      this.$axios
        .post(
          `/participant/register/email-verification/${this.$route.params.id}`
        )
        .then(() => {
          this.redirect()
        })
        .catch((err) => {
          // sweet alert
          this.$swal.fire({
            title: 'Gagal',
            text: err.response.data.message,
            icon: 'error',
          })
        })
    },
  },
}
</script>

<style></style>
