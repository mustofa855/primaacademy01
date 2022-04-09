<template>
  <FormulateForm v-slot="{ hasErrors }" :values="items" @submit="confirm">
    <slot v-bind="{ hasErrors }" />
  </FormulateForm>
</template>

<script>
export default {
  name: 'FormSubmit',
  props: {
    items: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    endpoint: {
      type: String,
      default: '',
      required: true,
    },
    itemUpdateId: {
      type: String,
      default: '',
      required: false,
    },
    redirect: {
      type: String,
      default: '',
      required: false,
    },
    isFormData: {
      type: Boolean,
      default: false,
      required: false,
    },
    isCustomError: {
      type: Boolean,
      default: false,
      required: false,
    },
  },

  computed: {
    hasErrors() {
      return this.$refs.default.hasErrors
    },
  },

  methods: {
    submit() {
      const formData = new FormData()
      const data = {}
      // formData.forEach((value, key) => {
      //   data[key] = value;
      // });
      for (const prop in this.items) {
        formData.append(prop, this.items[prop])
      }

      if (this.itemUpdateId) {
        data.id = this.itemUpdateId
        this.$axios
          .post(`${this.endpoint}/${this.itemUpdateId}`, formData)
          .then((res) => {
            this.$emit('submit')
            this.$swal({
              title: res.message,
              text: 'Data Berhasil Diperbarui',
              type: 'success',
              showConfirmButton: false,
              timer: 1500,
            })
            this.$router.push(this.redirect)
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error)
            this.$swal({
              title: 'Gagal',
              icon: 'error',
              text: error.response.data.message,
              type: 'error',
              showConfirmButton: false,
              timer: 2000,
            })
          })
      } else {
        this.$axios
          .post(this.endpoint, this.isFormData ? formData : this.items)
          .then((res) => {
            this.$emit('submit')
            this.$swal({
              title: res.data.message,
              icon: 'success',
              type: 'success',
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              this.$emit('submited')
              if (this.redirect) this.$router.push(this.redirect)
            })
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log(error.response)
            if (!this.isCustomError) {
              this.$swal({
                title: 'Gagal',
                icon: 'error',
                text: error.response.data.error,
                type: 'error',
                showConfirmButton: false,
                timer: 1500,
              })
            } else {
              this.$emit('error', error.response.data)
            }
          })
      }
    },

    confirm() {
      this.$swal({
        title: 'Data akan ditambahkan?',
        text: 'Data sudah benar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Tambahkan',
        cancelButtonText: 'Batalkan',
        reverseButtons: true,
      }).then((res) => {
        if (res.isConfirmed) {
          this.submit()
        }
      })
    },
  },
}
</script>
