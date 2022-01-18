<template>
  <div>
    <title-bar
      :breadcrumbs="[
        {
          label: 'Master Data',
          active: true,
          to: '/master-data',
        },
        {
          label: 'Skema Sertifikasi',
          active: true,
          to: '/master-data/certificate',
        },
        {
          label: $store.state.certificate.certificateName,
          active: true,
          to: `/master-data/certificate/${$store.state.certificate.certificateName}`,
        },
        {
          label: $store.state.certificate.competencyName,
          active: false,
          to: `/master-data/certificate/${$store.state.certificate.certificateName}/${$store.state.certificate.competencyName}`,
        },
      ]"
      :title="title"
      :subtitle="subtitle"
      is-controlbar
    />
    <control-bar
      v-model="search"
      button-name="Tambah Elemen"
      @buttonClick="showModal = !showModal"
    />

    <!-- data table -->
    <div>
      <kunci-table :header-table="header" :data="items">
        <template #no="{ index }">{{ index + pagination.from }}</template>
        <template #action="{ item }">
          <kunci-button
            :dense="true"
            class="bg-success hover:bg-success-shade"
            tooltip="Kriteria"
            @click="toCriteria(item)"
          >
            <img class="w-4" :src="('/edit.svg')" />
          </kunci-button>
          <delete-button :id="item.id" endpoint="element/delete" @deleted="fetchData" />
        </template>
      </kunci-table>

      <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" />
    </div>

    <kunci-modal
      :show="showModal"
      :items="input"
      endpoint="element/create"
      title="Form Tambah Elemen"
      @closed="showModal = !showModal; fetchData(); resetInput()"
    >
      <FormulateInput
        v-model="input.name"
        type="text"
        label="Nama Elemen"
        placeholder="Nama Elemen"
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
        unit_competetion_id: '',
        name: '',
      }
    }
  },
  fetch() {
    this.getDetail()
  },
  watch: {
    pagination: {
      handler() {
        this.fetchData(this.pagination.current_page)
      },
      deep: true,
    },
    search: {
      handler() {
        this.fetchData(this.pagination.current_page)
      },
      deep: true,
    },
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    click() {
      // this.$router.push('/master-data/certificate/create')
    },

    paginate(e) {
      this.pagination.current_page = e
    },

    async fetchData(currentPage) {
      await this.$axios.$get('element', {
        params: {
          page: currentPage || this.pagination.current_page,
          search: this.search,
          limit: this.pagination.per_page,
          unit_competetion_id: this.input.unit_competetion_id
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
      this.title = this.$store.state.certificate.competencyName
      this.subtitle = this.$store.state.certificate.competencyNumber

      this.input.unit_competetion_id = this.$store.state.certificate.competencyId
    },

    toCriteria(item) {

      this.$store.commit('certificate/SET_ELEMENT', item);
      this.$router.push({
        path: `${this.$route.path}/${item.name}`,
      })
    },

    resetInput() {
      this.input.name = ''
    }
  },
}
</script>

<style>
</style>

