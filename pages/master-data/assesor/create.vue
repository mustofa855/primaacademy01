<template>
  <div>
    <create-page
      :title="'Tambah Asesor'"
      :subtitle="'Anda dapat menambah asesor'"
      :form-title="'Form Tambah Asesor'"
      endpoint="assessor/create"
      :items="items"
      :redirect="'/master-data/assesor'"
      :back="'/master-data/assesor'"
    >
      <FormulateInput
        v-model="items.name"
        type="text"
        label="Nama Asesor"
        placeholder="Nama Asesor"
        validation="required"
        error-behavior="live"
      />
      <FormulateInput
        v-model="items.email"
        type="email"
        label="Email"
        placeholder="Email Asesor"
        validation="required|email"
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

      <div class="font-semibold">
        <p>Credential</p>
      </div>
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
      <FormulateInput
        v-model="items.confirm_password"
        type="password"
        label="Konfirmasi Password"
        placeholder="Konfirmasi Password"
        validation="required|min:8,length"
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
        email: '',
        is_active: '',
        username: '',
        password: '',
        confirm_password: '',
      }
    }
  },
}
</script>

<style>
</style>
