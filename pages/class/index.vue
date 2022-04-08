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

    <!-- pagination -->
    <!-- <pagination
      :pagination="pagination"
      @refetch="paginate"
      @paginate="paginate"
    /> -->
  </div>
</template>

<script>
import ControlBar from '~/components/ControlBar.vue'

// import Pagination from '~/components/Pagination.vue'
import TitleBar from '~/components/TitleBar.vue'
export default {
  components: { TitleBar, ControlBar },
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
}
</script>

<style></style>
