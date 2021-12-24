<template>
  <div>
    <title-bar
      :back="`/master-data/certificate/${$route.params.competency}/${$route.params.element}/${$route.params.criteria}`"
      :title="title"
      :subtitle="subtitle"
    />

    <!-- data table -->
    <div>
      <kunci-table
        extra-header
        :extra-header-table="extraHeader"
        :header-table="header"
        :data="items"
      >
        <template #no="{ index }">{{ index + pagination.from }}</template>
        <template #action="{ item }">
          <kunci-button
            :dense="true"
            class="bg-success hover:bg-success-shade w"
            tooltip="Detail"
            @click="showModal = !showModal; click(item.id)"
          >
            <img class="w-4 w" :src="('/edit.svg')" />
          </kunci-button>
        </template>
        <template #tof_l="{ item }">{{ item.tof_l ? 'L' : '' }}</template>
        <template #tof_tl="{ item }">{{ item.tof_tl ? 'TL' : '' }}</template>
        <template #tof_t="{ item }">{{ item.tof_t ? 'T' : '' }}</template>
      </kunci-table>

      <!-- <pagination :pagination="pagination" @refetch="paginate" @paginate="paginate" /> -->
    </div>

    <kunci-modal
      :show="showModal"
      :items="input"
      :endpoint="`evidence/update/${id}`"
      title="Form Detail Bukti"
      @closed="showModal = !showModal; fetchData(); resetInput()"
    >
      <FormulateInput
        v-model="input.name"
        type="textarea"
        label="Bukti Hasil Observasi"
        placeholder="Hasil Observasi"
        validation="required"
        error-behavior="live"
      />
      <!-- pilih jenis bukti -->
      <div class="text-left">
        <p class="font-semibold">Pilih Jenis Bukti Laporan</p>
        <FormulateInput
          v-model="input.tof_l"
          type="checkbox"
          label="L (Default)"
          outer-class="w-max"
          wrapper-class="flex justify-center items-center py-2"
          input-class="w-[20px] flex"
        />
        <FormulateInput
          v-model="input.tof_tl"
          type="checkbox"
          label="TL"
          outer-class="w-max"
          wrapper-class="flex justify-center items-center py-2"
          input-class="w-[20px] flex"
        />
        <FormulateInput
          v-model="input.tof_t"
          type="checkbox"
          label="T"
          outer-class="w-max"
          wrapper-class="flex justify-center items-center py-2"
          input-class="w-[20px] flex"
        />
      </div>

      <!-- Motede & Perangkat Asesmen -->
      <div class="my-4">
        <p class="font-semibold">Metode & Perangkat Asesmen</p>
        <FormulateInput
          v-model="input.method_ol"
          :options="methodItems"
          type="select"
          placeholder="Oservasi Langsung"
          label="Which of your children is your favorite?"
          validation="required"
          error-behavior="live"
        />
        <FormulateInput
          v-model="input.method_ks"
          :options="methodItems"
          type="select"
          placeholder="Kegiata Struktur"
          label="Which of your children is your favorite?"
          validation="required"
          error-behavior="live"
        />
        <FormulateInput
          v-model="input.method_tj"
          :options="methodItems"
          type="select"
          placeholder="Tanya Jawab"
          label="Which of your children is your favorite?"
          validation="required"
          error-behavior="live"
        />
        <FormulateInput
          v-model="input.method_vp"
          :options="methodItems"
          type="select"
          placeholder="Verifikasi Portofolio"
          label="Which of your children is your favorite?"
          validation="required"
          error-behavior="live"
        />
        <FormulateInput
          v-model="input.method_rp"
          :options="methodItems"
          type="select"
          placeholder="Ulasan Produk"
          label="Which of your children is your favorite?"
          validation="required"
          error-behavior="live"
        />
        <FormulateInput
          v-model="input.method_other"
          :options="methodItems"
          type="select"
          placeholder="Lainnya"
          label="Which of your children is your favorite?"
          validation="required"
          error-behavior="live"
        />
      </div>
    </kunci-modal>
  </div>
</template>

<script>
import TitleBar from '~/components/TitleBar.vue'
import KunciTable from '~/components/KunciTable.vue'
import KunciButton from '~/components/KunciButton.vue'
import KunciModal from '~/components/KunciModal.vue'
export default {
  components: { TitleBar, KunciTable, KunciModal },
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
          text: '',
          key: 'no',
        },
        {
          text: '',
          key: 'name',
        },
        {
          text: 'L',
          key: 'tof_l',
        },
        {
          text: 'TL',
          key: 'tof_tl',
        },
        {
          text: 'T',
          key: 'tof_t',
        },
        {
          text: 'Observasi Langsung',
          key: 'method_ol',
        },
        {
          text: 'Kegiatan Struktur',
          key: 'method_ks',
        },
        {
          text: 'Tanya Jawab',
          key: 'method_tj',
        },
        {
          text: 'Verifikasi Portofolio',
          key: 'method_vp',
        },
        {
          text: 'Ulasan Produk',
          key: 'method_rp',
        },
        {
          text: 'Lainnya',
          key: 'method_other',
        },
        {
          text: '',
          key: 'action',
        },
      ],
      extraHeader: [
        {
          text: 'No',
          colspan: 1,
        },
        {
          text: 'Bukti',
          colspan: 1,
        },
        {
          text: 'Jenis Bukti',
          colspan: 3,
        },
        {
          text: 'Metode & Perangkat Asesmen',
          colspan: 6,
        },
        {
          text: 'Aksi',
          colspan: 1,
        },
      ],
      search: null,
      title: '',
      subtitle: '',
      showModal: false,

      // input
      input: {
        criteria_id: '',
        name: '',
        tof_l: true,
        tof_tl: false,
        tof_t: false,
        method_ol: '',
        method_ks: '',
        method_tj: '',
        method_vp: '',
        method_rp: '',
        method_other: ''
      },

      // methods item
      methodItems: [],

      // id item
      id: null,
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
    this.fetchDataMethod()
  },
  methods: {
    click(e) {
      this.id = e
    },

    paginate(e) {
      this.pagination.current_page = e
    },

    async fetchData() {
      await this.$axios.$get('evidence', {
        params: {
          // page: currentPage || this.pagination.current_page,
          // search: this.search,
          // limit: this.pagination.per_page,
          criteria_id: this.input.criteria_id
        }
      }).then(res => {
        if (res) {
          this.items = res.data;
          // this.pagination.current_page = res.data.current_page
          // this.pagination.total = res.data.total_items
          // this.pagination.last_page = res.data.total_pages

          // const split = res.data.displayed_items.split('-')

          // this.pagination.from = parseInt(split[0])
          // this.pagination.to = parseInt(split[1])
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err.response);
      })
    },

    async fetchDataMethod() {
      await this.$axios.$get('master-method', {
      }).then(res => {
        if (res) {
          this.methodItems = res.data;
        }
      }).catch(err => {
        // eslint-disable-next-line no-console
        console.log(err.response);
      })
    },

    getDetail() {
      this.title = this.$store.state.certificate.criteriaName
      this.subtitle = ''

      this.input.criteria_id = this.$store.state.certificate.criteriaId
    },
    resetInput() {
      this.input.name = ''
    }
  },
}
</script>

<style>
</style>

