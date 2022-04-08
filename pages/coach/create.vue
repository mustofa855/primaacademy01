<template>
  <div>
    <create-page
      :title="'Detail Pelatih'"
      :subtitle="'Pada menu ini anda dapat mengelola akun Pelatih.'"
      :form-title="'Data Pelatih'"
      endpoint=""
      :items="items"
      :redirect="'/coach'"
      :back="'/coach'"
      :select2="true"
      is-form-data
    >
    </create-page>
  </div>
</template>

<script>
import CreatePage from '~/components/CreatePage.vue'
// import InputSelect from '~/components/InputSelect.vue'
// import KunciButton from '~/components/KunciButton.vue'
export default {
  components: {
    // InputSelect,
    // KunciButton,
    CreatePage,
  },
  layout: 'admin',
  data() {
    return {}
  },
  methods: {},
}
</script>

<style></style>
