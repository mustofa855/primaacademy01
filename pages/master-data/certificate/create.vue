<template>
  <div>
    <create-page
      :title="'Tambah Skema Sertifikasi'"
      :subtitle="'Anda dapat menambah skema sertifikasi'"
      :form-title="'Form Tambah Skema Sertifikasi'"
      endpoint="certification-scheme/create"
      :items="items"
      :redirect="'/master-data/certificate'"
      :back="'/master-data/certificate'"
      :select2="true"
    >
      <FormulateInput
        v-model="items.name"
        type="text"
        label="Nama"
        placeholder="Nama"
        validation="required"
        error-behavior="live"
      />
      <FormulateInput
        v-model="items.number"
        type="text"
        label="Nomor"
        placeholder="Nomor"
        validation="required"
        error-behavior="live"
      />
      <FormulateInput
        v-model="items.year"
        type="number"
        label="Tahun"
        placeholder="Tahun"
        validation="required"
        error-behavior="live"
      />
      <FormulateInput
        v-model="items.is_active"
        :options="{ 0: 'Tidak Aktif', 1: 'Aktif' }"
        type="select"
        placeholder="Status Aktif"
        label="Status Aktif"
        validation="required"
        error-behavior="live"
      />
    </create-page>
  </div>
</template>

<script>
import CreatePage from '~/components/CreatePage.vue'
export default {
  components: { CreatePage },
  layout: 'admin',
  data() {
    return {
      items: {
        name: '',
        number: '',
        year: '',
        is_active: '',
      }
    }
  },
}
</script>

<style >
</style>
