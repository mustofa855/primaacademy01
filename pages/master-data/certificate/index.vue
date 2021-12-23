<template>
  <div>
    <title-bar
      :back="'/master-data'"
      :title="'Skema Serifikasi'"
      :subtitle="'Anda dapat mengelola skema serifikasi'"
      is-controlbar
    />
    <control-bar button-name="Tambah Skema Baru" @buttonClick="click" />

    <!-- data table -->
    <div>
      <kunci-table :headerTable="header" :data="items">
        <template #no="{ index }">{{ index + 1 }}</template>
        <template #is_active="{ item }">
          <div
            :class="`${item.is_active ? 'text-primary' : 'text-danger'}`"
          >{{ item.is_active ? 'Aktif' : 'Tidak Aktif' }}</div>
        </template>
        <template #action>
          <kunci-button :dense="true">i</kunci-button>
        </template>
      </kunci-table>

      <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" />
    </div>

    <!-- modal -->
    <!-- <div class="min-h-screen max-h-screen absolute z-10 top-0 left-0 w-screen">
      <div class="bg-gray-700 absolute w-screen h-screen opacity-40 blur-[15px]"></div>
      <div class="relative">
        <div class="flex min-h-screen">
          <div class="min-w-96 m-auto my-auto bg-white min-h-44 p-4 rounded-md">ini adalah tulisan</div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import ControlBar from '~/components/ControlBar.vue'
import TitleBar from '~/components/TitleBar.vue'
import Pagination from '~/components/Pagination.vue'
import KunciTable from '~/components/KunciTable.vue'
import KunciButton from '~/components/KunciButton.vue'
export default {
  components: { TitleBar, ControlBar, Pagination, KunciTable },
  layout: 'admin',
  KunciButton,
  data() {
    return {
      items: [],
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
      header: [
        {
          text: 'No',
          key: 'no',
        },
        {
          text: 'Nama Skema',
          key: 'name',
        },
        {
          text: 'Nomor',
          key: 'number',
        },
        {
          text: 'Tahun',
          key: 'year',
        },
        {
          text: 'Tahun',
          key: 'year',
        },
        {
          text: 'Status Aktif',
          key: 'is_active',
        },
        {
          text: 'Aksi',
          key: 'action',
        },
      ],
      search: null,
    }
  },
  fetch() {
    this.fetchData();
  },
  watch: {
    pagination: {
      handler() {
        this.fetchData(this.pagination.current_page)
      },
      deep: true,
    }
  },
  methods: {
    click() {
      this.$router.push('/master-data/certificate/create')
    },

    paginate(e) {
      this.pagination.current_page = e
    },

    async fetchData(currentPage) {
      await this.$axios.$get('certification-scheme', {
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
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err.response);
      })
    }
  },
}
</script>

<style>
</style>

