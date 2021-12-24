<template>
  <div>
    <title-bar
      :back="`/master-data/certificate/${$route.params.competency}/${$route.params.element}`"
      :title="title"
      :subtitle="subtitle"
      is-controlbar
    />
    <control-bar button-name="Tambah Kriteria" @buttonClick="showModal = !showModal" />

    <!-- data table -->
    <div>
      <kunci-table :header-table="header" :data="items">
        <template #no="{ index }">{{ index + pagination.from }}</template>
        <template #action="{ item }">
          <kunci-button :dense="true" class="bg-success hover:bg-success-shade" tooltip="Kriteria">
            <img class="w-4" :src="('/edit.svg')" />
          </kunci-button>
          <delete-button :id="item.id" endpoint="criteria-for-work/delete" @deleted="fetchData" />
        </template>
      </kunci-table>

      <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" />
    </div>

    <kunci-modal
      :show="showModal"
      :items="input"
      endpoint="criteria-for-work/create"
      title="Form Tambah Kriteria"
      @closed="showModal = !showModal; fetchData();resetInput()"
    >
      <FormulateInput
        v-model="input.name"
        type="text"
        label="Nama Kriteria"
        placeholder="Nama Kriteria"
        validation="required"
        error-behavior="live"
      />
    </kunci-modal>
  </div>
</template>

<script>
import ControlBar from '~/components/ControlBar.vue'
import TitleBar from '~/components/TitleBar.vue'
import Pagination from '~/components/Pagination.vue'
import KunciTable from '~/components/KunciTable.vue'
import KunciButton from '~/components/KunciButton.vue'
import KunciModal from '~/components/KunciModal.vue'
import DeleteButton from '~/components/DeleteButton.vue'
export default {
  components: { TitleBar, ControlBar, Pagination, KunciTable, KunciModal, DeleteButton },
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
          text: 'Elemen',
          key: 'name',
        },
        {
          text: 'Aksi',
          key: 'action',
        },
      ],
      search: null,
      title: '',
      subtitle: '',
      showModal: false,

      // input
      input: {
        element_id: '',
        name: '',
      }
    }
  },
  fetch() {
    this.getDetail()
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
  mounted() {

    // eslint-disable-next-line no-console
    console.log(this.$route);
  },
  methods: {
    click() {
      // this.$router.push('/master-data/certificate/create')
    },

    paginate(e) {
      this.pagination.current_page = e
    },

    async fetchData(currentPage) {
      await this.$axios.$get('criteria-for-work', {
        params: {
          page: currentPage || this.pagination.current_page,
          search: this.search,
          limit: this.pagination.per_page,
          element_id: this.input.element_id
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
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err.response);
      })
    },

    getDetail() {
      this.title = this.$store.state.certificate.elementName
      this.subtitle = ''

      this.input.element_id = this.$store.state.certificate.elementId
    },
    resetInput(){
      this.input.name = ''
    }
  },
}
</script>

<style>
</style>

