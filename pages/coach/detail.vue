<template>
  <div>
    <create-page
      :title="'Detail Pelatih'"
      :subtitle="'Pada menu ini anda dapat mengelola akun Pelatih.'"
      :form-title="'Data Pelatih'"
      :endpoint="`role/update/${$store.state.employee.id}`"
      :items="roles"
      :redirect="'/coach'"
      :back="'/coach'"
      :select2="true"
      label-button="Update"
      is-form-data
    >
      <div class="grid grid-cols-2 gap-4">
        <!-- section 1 -->
        <div>
          <FormulateInput
            v-model="items.name"
            type="text"
            label="Nama Pelatih"
            placeholder="Nama Pelatih"
            validation="required"
            error-behavior="live"
            disabled
          />
          <FormulateInput
            v-model="items.email"
            type="email"
            label="Email"
            placeholder="Email"
            validation="required"
            error-behavior="live"
            disabled
          />
          <FormulateInput
            v-model="items.phone_number"
            type="text"
            label="No. Telepon"
            placeholder="No. Telepon"
            validation="required"
            error-behavior="live"
            disabled
          />
          <FormulateInput
            v-model="items.nik"
            type="number"
            label="NIK"
            placeholder="NIK"
            validation="required|min:16,length"
            error-behavior="live"
            disabled
          />
          <FormulateInput
            v-model="items.national_id"
            type="select"
            placeholder="Kewarganegaraan"
            validation="required"
            label="Kategori"
            disabled
          />
        </div>
        <!-- section 2 -->
        <div>
          <FormulateInput
            v-model="items.city_id"
            type="select"
            placeholder="Kota"
            validation="required"
            label="Kota"
            disabled
          />
          <FormulateInput
            v-model="items.address"
            type="textarea"
            label="Alamat"
            validation="required"
            error-behavior="live"
            disabled
          />
          <FormulateInput
            v-model="items.club_id"
            type="select"
            placeholder="Klub"
            validation="required"
            label="Klub"
            disabled
          />
          <div>
            <h3 class="font-semibold">Role</h3>
            <multiselect
              v-model="role"
              class="rounded-full"
              placeholder="Pilih Role"
              label="label"
              track-by="label"
              deselect-label="Hapus"
              selected-label="Pilih"
              select-label="Tambah"
              :options="rolesList"
              :multiple="true"
              :taggable="true"
            />
          </div>
        </div>
      </div>
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
    return {
      items: {
        username: 'kuncitech',
        email: 'myemail@kunci.co.id',
        name: 'Kunci Tech',
        phone_number: '087812345678',
        address: null,
        city_id: null,
        city_name: null,
        province_id: null,
        province_name: null,
        national_id: null,
        national_code: null,
        national_name: null,
        club_id: null,
        club_name: null,
        coach_category_id: null,
        coach_category_name: null,
        photo: null,
        ktp: 'http://127.0.0.1:8000/storage/',
        nik: null,
      },
      rolesList: [],
      role: [],
    }
  },
  computed: {
    roles() {
      const role = {
        roles: [],
      }
      role.roles = this.role.map((item) => {
        return item.id
      })
      return role
    },
  },
  mounted() {
    this.fetchRoles()
    this.fetchDetail()
    this.fetchHasRole()
  },
  methods: {
    fetchRoles() {
      this.$axios.$get('/role/check-list-exist').then(({ data }) => {
        this.rolesList = data.map((item) => ({
          id: item.id,
          label: item.name,
        }))
      })
    },
    fetchDetail() {
      this.$axios
        .$get(`/employee/detail/${this.$store.state.employee.id}`)
        .then(({ data }) => {
          this.items = data
        })
    },
    fetchHasRole() {
      this.$axios
        .$get(`/role/list-user/${this.$store.state.employee.id}`, {
          params: {
            employee: true,
          },
        })
        .then(({ data }) => {
          // filter when selected is true
          this.role = data.filter((item) => item.selected)
          this.role = data.map((e) => ({
            id: e.id,
            label: e.name,
          }))
        })
    },
  },
}
</script>

<style></style>
