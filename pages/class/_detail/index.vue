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
      :customb-bar="true"
      :button-name="'Tambah Video Baru'"
      :to-page="`/class/${$store.state.class.name}/create`"
    >
      <div v-if="detail">
        <div class="flex flex-row">
          <img class="w-4" :src="detail.thumbnail" />
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
  </div>
</template>

<script>
import ControlBar from '~/components/ControlBar.vue'
import TitleBar from '~/components/TitleBar.vue'
export default {
  components: { TitleBar, ControlBar },
  layout: 'admin',
  data() {
    return {
      detail: null,
    }
  },
  mounted() {
    this.fetchDataDetail()
  },
  methods: {
    async fetchData(currentPage) {
      await this.$axios
        .$get('class_category/get', {
          params: {
            page: currentPage || this.pagination.current_page,
            search: this.search,
            limit: this.pagination.per_page,
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
    async fetchDataDetail(currentPage) {
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
  },
}
</script>

<style></style>
