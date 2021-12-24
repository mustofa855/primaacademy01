<template>
  <div>
    <title-bar
      :back="'/master-data/certificate'"
      :title="title"
      :subtitle="subtitle"
      is-controlbar
    />
    <control-bar button-name="Tambah Unit Kompetensi" @buttonClick="showModal = !showModal" />

    <!-- data table -->
    <div>
      <kunci-table :header-table="header" :data="items">
        <template #no="{ index }">{{ index + pagination.from }}</template>
        <template #action="{ item }">
          <kunci-button
            :dense="true"
            class="bg-success hover:bg-success-shade"
            tooltip="Elemen"
            @click="toElemen(item)"
          >
            <img class="w-4" :src="('/edit.svg')" />
          </kunci-button>
          <delete-button :id="item.id" endpoint="unit-competetion/delete" @deleted="fetchData" />
        </template>
      </kunci-table>

      <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" />
    </div>

    <kunci-modal
      :show="showModal"
      :items="input"
      endpoint="unit-competetion/create"
      title="Form Tambah Unit Kompetensi"
      @closed="showModal = !showModal; fetchData(); resetInput()"
    >
      <FormulateInput
        v-model="input.title"
        type="text"
        label="Judul Unit"
        placeholder="Judul Unit"
        validation="required"
        error-behavior="live"
      />
      <FormulateInput
        v-model="input.code"
        type="text"
        label="Kode Unit"
        placeholder="Kode Unit"
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
          text: 'Judul Unit',
          key: 'title',
        },
        {
          text: 'Kode Unit',
          key: 'code',
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
        certification_id: '',
        title: '',
        code: '',
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
    }
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
      if (this.input.certification_id) {
        await this.$axios.$get('unit-competetion', {
          params: {
            page: currentPage || this.pagination.current_page,
            search: this.search,
            limit: this.pagination.per_page,
            certification_id: this.input.certification_id
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
      } else {
        // eslint-disable-next-line no-console
        console.log('no certification id')
      }
    },

    getDetail() {
      this.title = this.$store.state.certificate.certificateName
      this.subtitle = this.$store.state.certificate.certificateNumber

      this.input.certification_id = this.$store.state.certificate.certificateId
    },

    toElemen(item) {
      // eslint-disable-next-line no-console
      console.log(item);

      this.$store.commit('certificate/SET_COMPETENCY', item);
      this.$router.push({
        path: `${this.$route.path}/${item.title}`,
      })
    },
    resetInput() {
      this.input.title = ''
      this.input.code = ''
    }
  },
}
</script>

<style>
</style>

