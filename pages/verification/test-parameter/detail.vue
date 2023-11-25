<template>
  <div>
    <title-bar
      is-controlbar
      :title="'Verifikasi Test Parameter'"
      :subtitle="'Pada menu ini anda dapat melakukan verifikasi test parameter.'"
    />
    {{ items }}
    <Tabs></Tabs>
  </div>
</template>

<script>
// import CreatePage from '~/components/CreatePage.vue'
// import InputSelect from '~/components/InputSelect.vue'
// import KunciButton from '~/components/KunciButton.vue'
import TitleBar from '~/components/TitleBar.vue'
export default {
  components: {
    // InputSelect,
    // KunciButton,
    // CreatePage,
    // Tabs,
    // Tab,
    TitleBar
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
      test: null,
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
    this.fetchDataDetail()
    this.fetchDetail()
    this.fetchHasRole()
  },
  methods: {
    
    fetchDataDetail() {
        this.$axios
        .$get(`https://bepssi.kunci.co.id/api/performance/tests/${this.$store.state.employee.id}`)
        .then(({ data }) => {
          this.test = data
          console.log(this.test)
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
