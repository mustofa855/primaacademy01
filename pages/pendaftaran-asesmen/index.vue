<template>
  <div class="max-w-xl mx-auto">
    <title-asesmen :title="'Asemen'" :subtitle="'Silahkan pilih asesmen yang diinginkan'" />
    <search-input v-model="search" class="my-4 text-center" @input="fetchData"></search-input>

    <!-- data tabel -->
    <kunci-table :header-table="header" :data="items">
      <template #no="{ index }">{{ index + pagination.from }}</template>
      <template #action="{ item }">
        <kunci-button
          :dense="true"
          class="bg-success hover:bg-success-shade"
          :tooltip="`Ke ${item.name}`"
          @click="toRegistration(item)"
        >
          <img class="w-4" :src="('/edit.svg')" />
        </kunci-button>
      </template>
    </kunci-table>
    <!-- pagination -->
    <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" />
  </div>
</template>
<script>
import TitleAsesmen from '~/components/TitleAsesmen.vue'
import KunciButton from '~/components/KunciButton.vue'
import SearchInput from '~/components/SearchInput.vue'
export default {
  components: { TitleAsesmen, KunciButton, SearchInput },
  layout: 'participant',
  auth: false,
  data() {
    return {
      search: '',
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
          text: 'Nama Asesmen',
          key: 'name',
        },
        {
          text: 'Aksi',
          key: 'action',
        },
      ],
      items: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        const data = await this.$axios.$get('assessment/for-participant', {
          params: {
            search: this.search,
            page: this.pagination.current_page,
          },
        })
        this.items = data.data.rows
        // eslint-disable-next-line no-console
        console.log(data)
      } catch {
        this.$toast.error('Terjadi kesalahan saat mengambil data')
      }
    },
    paginate(e) {
      // eslint-disable-next-line no-console
      console.log('paginate')
      this.pagination.current_page = e
    },
    toRegistration(e) {
      this.$store.commit('registration/SetRegistration', e)
      this.$router.push(`${this.$route.name}/${e.hash_name}`,
      )
    }
  }
}
</script>
