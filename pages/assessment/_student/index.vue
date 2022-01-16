<template>
  <div>
    <title-bar
      :back="'/assessment'"
      is-controlbar
      :title="'Asesmen'"
      :subtitle="'Anda dapat mengelola asesmen'"
    />
    <control-bar
      v-model="search"
      :button-name="'Tambah Asesmen Baru'"
      :disabled-button="true"
      @buttonClick="click"
    />

    <!-- data tabel -->
    <kunci-table :header-table="tableHeader" :data="items">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <!-- <template #is_active="{ item }">
        <div
          :class="`${toLower(item.status) == 'aktif' ? 'text-primary' : 'text-danger'}`"
        >{{ toLower(item.status) == 'aktif' ? 'Aktif' : 'Tidak Aktif' }}</div>
      </template>-->
      <!-- <template #action="{ item }">
        <kunci-button
          :dense="true"
          class="bg-success hover:bg-success-shade"
          tooltip="Unit Kompetensi"
        >
          <img class="w-4" :src="('/edit.svg')" />
        </kunci-button>
        <kunci-button
          :dense="true"
          class="bg-success hover:bg-success-shade"
          tooltip="Siswa Terdaftar"
          @click="toStudent(item)"
        >
          <img class="w-4" :src="('/edit.svg')" />
        </kunci-button>
      </template>-->
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
  components: { TitleBar, ControlBar, Pagination, KunciTable },
  layout: 'admin',
  data() {
    return {
      tableHeader: [
        {
          text: 'No',
          key: 'no',
        },
        {
          text: 'Nama Siswa',
          key: 'name',
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
        from: 0,
        last_page: 1,
        last_page_url: '',
        next_page_url: null,
        path: '',
        per_page: 10,
        prev_page_url: null,
        to: 0,
        total: 0,
      },
    }
  },
}
</script>
