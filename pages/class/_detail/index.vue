<template>
  <div>
    <title-bar
      :title="'Kelas'"
      :subtitle="'Pada menu ini anda dapat mengelola Kelas.'"
      :breadcrumbs="[
        {
          label: 'Kelas',
          active: true,
          to: '/class',
        },
        {
          label: 'Detail Kelas',
          active: false,
          to: '',
        },
      ]"
    />

    <!-- control bar -->
    <control-bar
      :custom-bar="true"
      :button-name="'Tambah Video Baru'"
      :to-page="`/class/${$store.state.class.name}/create`"
    >
      <div v-if="detail">
        <div class="flex flex-row gap-4">
          <div class="w-24 h-24 rounded-lg">
            <img class="" :src="detail.thumbnail" />
          </div>
          <div class="flex flex-col">
            <h2 class="font-semibold text-2xl">{{ detail.name }}</h2>
            <p
              class="text-secondary hover:cursor-pointer"
              @click="openDetail(detail.description)"
            >
              Lihat Deskripsi Kelas
            </p>
          </div>
        </div>
      </div>
    </control-bar>

    <!-- data tabel -->
    <kunci-table :header-table="tableHeader" :data="items">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #skill="{ item }">
        <span v-for="(e, index) in item.skill" :key="index">
          {{ e.name }}
        </span>
      </template>
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
      detail: null,
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
      tableHeader: [
        {
          text: 'No',
          key: 'no',
        },
        {
          text: 'Nama Video',
          key: 'name',
        },
        {
          text: 'Free Watch?',
          key: 'is_premium',
        },
        {
          text: 'Praktek',
          key: 'is_task',
        },
        {
          text: 'Skill',
          key: 'skill',
        },
        {
          text: 'Aksi',
          key: 'action',
        },
      ],
      items: [],
    }
  },
  mounted() {
    this.fetchDataDetail()
    this.fetchData()
  },
  methods: {
    async fetchData(currentPage) {
      await this.$axios
        .$get('learning/list-learning', {
          params: {
            page: currentPage || this.pagination.current_page,
            search: this.search,
            limit: this.pagination.per_page,
            class_id: this.$store.state.class.id,
          },
        })
        .then((res) => {
          if (res) {
            this.items = res.data
            this.pagination.current_page = res.meta.current_page
            this.pagination.total = res.meta.total_items
            this.pagination.last_page = res.meta.last_page

            this.pagination.from = res.meta.from
            this.pagination.to = res.meta.to
          }
        })
    },
    async fetchDataDetail() {
      await this.$axios
        .$get(`classes/detail/${this.$store.state.class.id}`)
        .then(({ data }) => {
          this.detail = data
        })
    },
    openDetail(e) {
      this.$swal.fire({
        html: `<div class='text-left'>${e}</div>`,
        confirmButtonText: 'Oke',
      })
    },
    paginate(e) {
      // eslint-disable-next-line no-console
      console.log('paginate')
      this.pagination.current_page = e
    },
    toDetail(e) {},
  },
}
</script>

<style></style>
