<template>
  <div>
    <title-bar
      is-controlbar
      :title="'Asesor'"
      :subtitle="'Anda dapat mengelola sesor'"
      :back="'/master-data'"
    />
    <control-bar :button-name="'Tambah Asesor'" @buttonClick="click" />

    <!-- data tabel -->
    <kunci-table :header-table="tableHeader" :data="data">
      <template #no="{ index }">{{ index + 1 }}</template>
    </kunci-table>
    <pagination :pagination="pagination" />

    <!-- <div class="after:content-['*'] after:absolute after:text-primary">asdlkjasd</div> -->
  </div>
</template>

<script>
import ControlBar from '~/components/ControlBar.vue'
import KunciTable from '~/components/KunciTable.vue'
import TitleBar from '~/components/TitleBar.vue'
import Pagination from '~/components/Pagination.vue'
export default {
  components: { TitleBar, ControlBar, KunciTable, Pagination },
  layout: 'admin',
  data() {
    return {
      time: new Date(),
      tableData: [
        {
          id: 1,
          name: 'Asesor 1',
          email: '@malangkita.com',
        },
        {
          id: 2,
          name: 'Asesor 2',
          email: '@malangkita.com',
        },
        {
          id: 3,
          name: 'Asesor 3',
          email: '@malangkita.com',
        },
        {
          id: 4,
          name: 'Asesor 4',
          email: '@malangkita.com',
        },
        {
          id: 5,
          name: 'Asesor 5',
          email: '@malangkita.com',
        },
        {
          id: 6,
          name: 'Asesor 6',
          email: '@malangkita.com',
        },
        {
          id: 7,
          name: 'Asesor 7',
          email: '@malangkita.com',
        },
        {
          id: 8,
          name: 'Asesor 8',
          email: '@malangkita.com',
        },
        {
          id: 9,
          name: 'Asesor 9',
          email: '@malangkita.com',
        },
        {
          id: 10,
          name: 'Asesor 10',
          email: '@malangkita.com',
        },
      ],
      tableHeader: [
        {
          text: 'No',
          key: 'no',
        },
        {
          text: 'Nama',
          key: 'name',
        },
        {
          text: 'Email',
          key: 'email',
        },
        // {
        //   text: 'Status',

        //   key: 'status',
        // },
        // {
        //   text: 'Aksi',

        //   key: 'action',
        // },
      ],
      data: null,
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
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    click() {
      this.$router.push('/master-data/assesor/create')
    },
    async fetchData() {
      await this.$axios.get('/assessor/').then(res => {
        // eslint-disable-next-line no-console
        console.log(res.data.data)
        this.pagination.total = res.data.data.count

        this.data = res.data.data.rows
      })
    }
  },

}
</script>

<style>
</style>
