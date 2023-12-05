<template>
  <div v-if="items">
    <title-bar
      is-controlbar
      :title="'Pengguna'"
      :subtitle="'Pada menu ini anda dapat mengelola akun Pengguna.'"
    />
    <control-bar v-model="search" :button-name="'Tambah Pengguna Baru'" />
    <!-- data tabel -->
    <kunci-table :header-table="tableHeader" :data="items">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #action="{ item }">
        <kunci-button
          :dense="true"
          class="bg-success hover:bg-success-shade"
          @click="toDetail(item)"
        >
          <img class="w-4" :src="'/eye.svg'" />
        </kunci-button>
      </template>
    </kunci-table>
    <!-- pagination -->
    <pagination
      :pagination="pagination"
      @refetch="paginate"
      @paginate="paginate"
    />
  </div>
</template>

<script>
import ControlBar from '~/components/ControlBar.vue'
import KunciTable from '~/components/KunciTable.vue'
import Pagination from '~/components/Pagination.vue'
import TitleBar from '~/components/TitleBar.vue'
export default {
  components: { TitleBar, ControlBar, KunciTable, Pagination },
  layout: 'admin',
  data() {
    return {
      tableHeader: [
        {
          text: 'No',
          key: 'no',
        },
        {
          text: 'Nama Pengguna',
          key: 'username',
        },
        {
          text: 'Email',
          key: 'email',
        },
        {
          text: 'Role',
          key: 'role',
        },
        {
          text: 'Aksi',
          key: 'action',
        },
      ],
      pagination: {
        current_page: 1,
        first_page_url: '',
        from: 1,
        last_page: 1,
        last_page_url: '',
        next_page_url: null,
        path: '',
        per_page: 10,
        prev_page_url: null,
        to: 2,
        total: 0,
      },
      search: null,
      items: null,
    }
  },
  watch: {
    pagination: {
      handler() {
        this.fetchData(this.pagination.current_page)
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchData(this.pagination.current_page)
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // for pagination
    paginate(e) {
      this.pagination.current_page = e
    },

    // fetch data
    async fetchData(currentPage) {
      await this.$axios
        .$get('https://bepssi.kunci.co.id/api/users', {
          params: {
            page: currentPage || this.pagination.current_page,
            search: this.search,
            limit: this.pagination.per_page,
          },
        })
        .then((res) => {
          if (res) {
            this.items = res.data
            this.items.forEach(e => {
              e.role = e.user_type === 1?"Official": 
              e.user_type === 2?"Pemain":e.user_type === 3?"Club":""
            })
            this.pagination.current_page = res.meta.current_page
            this.pagination.total = res.meta.total_items
            this.pagination.last_page = res.meta.last_page

            this.pagination.from = res.meta.from
            this.pagination.to = res.meta.to
          }
        })
    },

    // to detail
    toDetail(e) {
      this.$store.commit('employee/SET_ID', e.id)
      this.$router.push(`/users/detail/`)
    },
  },
}
</script>

<style></style>
