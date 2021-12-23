<template>
  <kunci-button
    :dense="true"
    class="!bg-danger hover:!bg-danger-shade"
    tooltip="Hapus Data"
    @click="deleteData"
  >
    <img class="w-4" :src="('/trash.svg')" />
  </kunci-button>
</template>

<script>
export default {
  props: {
    id: {
      type: [Number, String],
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
  },
  methods: {
    deleteData() {
      this.$swal({
        title: 'Data Akan Dihapus!',
        text: "Anda yakin akan menghapus data ini?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Hapus',
        cancelButtonText: 'Batalkan',
        reverseButtons: true
      }).then(res => {
        if (res.isConfirmed) {
          this.submit();
        }
      });
    },
    submit() {
      this.$axios.$delete(this.endpoint + '/' + this.id).then(res => {
        this.$emit('deleted');
        this.$swal({
          title: res.message,
          icon: 'success',
          text: 'Data berhasil dihapus',
          type: 'success',
          showConfirmButton: false,
          timer: 2000,
        });
      }).catch(error => {
        this.$swal({
          title: error.response.data.message,
          icon: 'error',
          text: 'Data gagal dihapus',
          type: 'error',
          showConfirmButton: false,
          timer: 2000,
        });
      });
    }
  },
}
</script>
