<template>
  <div>
    <create-page
      :title="'Detail Pengguna'"
      :subtitle="'Pada menu ini anda dapat mengelola akun Pengguna.'"
      :form-title="'Data Pengguna'"
      :item-update-id="($store.state.employee.id).toString()"
      :endpoint="`/api/users`"
      :items="roles"
      :redirect="'/users'"
      :back="'/users'"
      :select2="true"
      label-button="Update"
      is-form-data
    >
      <div class="grid grid-cols-2 gap-4">
        <!-- section 1 -->
        <!-- {{ items }} -->
        <div>
          <FormulateInput
            v-model="items.username"
            type="text"
            label="Nama Pengguna"
            placeholder="Nama Pengguna"
            validation="required"
            error-behavior="live"
          />
          <FormulateInput
            v-model="items.email"
            type="email"
            label="Email"
            placeholder="Email"
            validation="required"
            error-behavior="live"
          />
          <FormulateInput
            v-model="items.phone_number"
            type="text"
            label="No. Telepon"
            placeholder="No. Telepon"
            validation="required"
            error-behavior="live"
          />
          <FormulateInput
            v-model="items.nik"
            type="number"
            label="NIK"
            placeholder="NIK"
            validation="required|min:16,length"
            error-behavior="live"
          />
          <FormulateInput
            v-model="items.nationality"
            type="select"
            placeholder="Kewarganegaraan"
            validation="required"
            label="Kategori"
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
          />
          <FormulateInput
            v-model="items.address"
            type="textarea"
            label="Alamat"
            validation="required"
            error-behavior="live"
          />
          <FormulateInput
            v-model="items.club_id"
            type="select"
            placeholder="Klub"
            validation="required"
            label="Klub"
          />
          <div>
            <h3 class="font-semibold">Role</h3>
            <multiselect
              v-model="items.roles"
              class="rounded-full"
              placeholder="Pilih Role"
              label="name"
              track-by="name"
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
    this.fetchDetail()
    this.fetchHasRole()
  },
  methods: {
    fetchDetail() {
      this.$axios
        .$get(`/api/users/detail/${this.$store.state.employee.id}`)
        .then(({ data }) => {
          this.items = data
        })
    },
    fetchHasRole() {
      this.$axios
        .$get(`/api/role/list-user/${this.$store.state.employee.id}`, {
          params: {
            employee: true,
          },
        })
        .then(({ data }) => {
          this.rolesList = data.map((e) => ({
            id: e.id,
            name: e.name,
          }))
          // filter selected is true in array object
          this.role = data.filter((e) => e.selected)
          // eslint-disable-next-line no-console
          console.log(this.role)

          // filter when selected is true
          // let roles = []

          data.forEach((element) => {
            if (element.selected) {
              // roles.push(element)
              // eslint-disable-next-line no-console
              console.log(element)
            }
          })
          // this.role = roles.map((e) => ({
          //   id: e.id,
          //   label: e.name,
          // }))
        })
    },
  },
}
</script>

<style></style>
