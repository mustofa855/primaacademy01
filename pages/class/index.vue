<template>
  <div>
    <title-bar
      is-controlbar
      :title="'Kelas'"
      :subtitle="'Pada menu ini anda dapat mengelola Kelas.'"
    />
    <control-bar
      v-model="search"
      :button-name="'Tambah Kelas Baru'"
      :to-page="'/class/create'"
    />
    <div class="flex flex-wrap gap-4 mt-6">
      <card-class @click="toDetail()"> </card-class>
    </div>

    <!-- pagination -->
    <!-- <pagination
      :pagination="pagination"
      @refetch="paginate"
      @paginate="paginate"
    /> -->
  </div>
</template>

<script>
import CardClass from '~/components/CardClass.vue'
import ControlBar from '~/components/ControlBar.vue'

// import Pagination from '~/components/Pagination.vue'
import TitleBar from '~/components/TitleBar.vue'
export default {
  components: { TitleBar, ControlBar, CardClass },
  layout: 'admin',
  data() {
    return {
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
      items: [],
    }
  },
  mounted() {},
  methods: {
    // fetch data
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

    toDetail() {
      this.$store.commit('class/SET_ID', 1)
      this.$store.commit('class/SET_NAME', 'kelas')
      this.$router.push('/class/asdasd')
    },
  },
}
</script>

<style></style>
