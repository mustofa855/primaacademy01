<template>
  <div>
    <title-bar is-controlbar :title="'Asesmen'" :subtitle="'Anda dapat mengelola asesmen'" />
    <control-bar v-model="search" :button-name="'Tambah Asesmen Baru'" @buttonClick="click" />

    <!-- data tabel -->
    <kunci-table :header-table="tableHeader" :data="items">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #is_active="{ item }">
        <div
          :class="`${toLower(item.status) == 'aktif' ? 'text-primary' : 'text-danger'}`"
        >{{ toLower(item.status) == 'aktif' ? 'Aktif' : 'Tidak Aktif' }}</div>
      </template>
      <template #action="{ item }">
        <kunci-button
          :dense="true"
          class="bg-success hover:bg-success-shade"
          tooltip="Ubah"
          @click="toUpdate(item)"
        >
          <img class="w-4" :src="('/edit.svg')" />
        </kunci-button>
        <kunci-button
          :dense="true"
          class="!bg-warning hover:!bg-warning-shade"
          tooltip="Siswa Terdaftar"
          @click="toStudent(item)"
        >
          <img class="w-4" :src="('/receipt.svg')" />
        </kunci-button>
      </template>
    </kunci-table>
    <!-- pagination -->
    <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" />
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
          text: 'Nama Asesmen',
          key: 'name',
        },
        {
          text: 'Nama Sekolah',
          key: 'school_name',
        },
        {
          text: 'Tanggal Pelaksanaan',
          key: 'date_start',
        },
        {
          text: 'Tanggal Pendaftaran',
          key: 'date_start_registration',
        },
        {
          text: 'Status',
          key: 'is_active',
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
        total: 2,
      },
      search: null,
      items: [],
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
    click() {
      this.$router.push('/assessment/create')
      // alert('click')
    },

    // for pagination
    paginate(e) {
      this.pagination.current_page = e
    },

    // fetch data
    async fetchData(currentPage) {
      await this.$axios.$get('assessment', {
        params: {
          page: currentPage || this.pagination.current_page,
          search: this.search,
          limit: this.pagination.per_page,
        }
      }).then(res => {
        if (res) {
          this.items = res.data.rows;
          this.pagination.current_page = res.data.current_page
          this.pagination.total = res.data.total_items
          this.pagination.last_page = res.data.total_pages

          const split = res.data.displayed_items.split('-')

          this.pagination.from = parseInt(split[0])
          this.pagination.to = parseInt(split[1])
        }
      })
    },

    // to lowercase
    toLower(e) {
      return e.toLowerCase()
    },
    toStudent(e) {
      this.$store.commit('assessment/SET_ASSESSMENT', e)
      this.$router.push(`/assessment/${e.hash_name}`)
    },
    toUpdate(e) {
      this.$store.commit('assessment/SET_ASSESSMENT', e)
      this.$router.push(`/assessment/update`)
    }
  },
}
</script>

<style>
</style>

