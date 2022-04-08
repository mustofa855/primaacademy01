<template>
  <div>
    <title-bar
      is-controlbar
      :title="'Pelatih'"
      :subtitle="'Pada menu ini anda dapat mengelola akun Pelatih.'"
    />
    <control-bar
      v-model="search"
      :button-name="'Tambah Pelatih Baru'"
      :to-page="'/coach/create'"
    />
    <!-- data tabel -->
    <kunci-table :header-table="tableHeader" :data="items">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #action>
        <kunci-button
          :dense="true"
          class="bg-success hover:bg-success-shade"
          tooltip="Ubah"
        >
          <img class="w-4" :src="'/edit.svg'" />
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
          text: 'Nama pelatih',
          key: 'name',
        },
        {
          text: 'Email',
          key: 'email',
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
      items: [],
    }
  },
}
</script>

<style></style>
