<template>
  <div>
    <create-page
      :title="'Tambah Asesmen Baru'"
      :subtitle="'Anda dapat menambah asesmen'"
      :form-title="'Form Tambah Asesmen'"
      endpoint="assessment/create"
      :items="items"
      :redirect="'/assessment'"
      :back="'/assessment'"
    >
      <div class="grid grid-cols-2 gap-4">
        <!-- section 1 -->
        <div>
          <FormulateInput
            v-model="items.name"
            type="text"
            label="Nama Asesmen"
            placeholder="Nama Asesmen"
            validation="required"
            error-behavior="live"
          />
          <FormulateInput
            v-model="items.school_name"
            type="text"
            label="Nama Sekolah"
            placeholder="Nama Sekolah"
            validation="required"
            error-behavior="live"
          />
          <!-- pertanggalan -->
          <div>
            <div class="font-semibold">Tanggal Pelaksanaan</div>
            <div class="grid grid-cols-2">
              <FormulateInput
                v-model="items.date_start"
                type="date"
                placeholder="Tanggal Mulai"
                validation="required"
                error-behavior="live"
                class="mr-2"
                :min="minDate"
              />
              <FormulateInput
                v-model="items.date_finish"
                type="date"
                placeholder="Tanggal Selesai"
                validation="required"
                error-behavior="live"
                class="ml-2"
                :min="minDate"
              />
            </div>
          </div>
          <div>
            <div class="font-semibold">Tanggal Pendataran</div>
            <div class="grid grid-cols-2">
              <FormulateInput
                v-model="items.date_start_registration"
                type="date"
                placeholder="Tanggal Mulai"
                validation="required"
                error-behavior="live"
                class="mr-2"
                :min="minDate"
              />
              <FormulateInput
                v-model="items.date_finish_registration"
                type="date"
                placeholder="Tanggal Selesai"
                validation="required"
                error-behavior="live"
                class="ml-2"
                :min="minDate"
              />
            </div>
          </div>
        </div>

        <!-- section 2 -->
        <div>
          <!-- skema -->
          <input-select
            :options="skemaItems"
            label="Skema Sertifikasi"
            @search="fetchSkema"
            @clicked="fetchSkema"
            @selected="schemeSelected"
          />
          <!-- loop assessor -->
          <div
            v-for="(item, index) in items.assessor"
            :key="index"
            class="grid grid-cols-4 gap-4 items-center"
          >
            <input-select
              :options="assessorItems"
              class="col-span-3"
              :label="`Assessor ${index + 1}`"
              @search="fetchAssessor"
              @clicked="fetchAssessor"
              @selected="assessorSelected($event, index)"
            />
            <div>
              <kunci-button
                v-if="items.assessor.length - 1 == index"
                type="button"
                class="!bg-success hover:!bg-success-shade"
                tooltip="Tambah Data"
                @click="addAssessor"
              >+</kunci-button>

              <kunci-button
                v-if="items.assessor.length > 1 && items.assessor.length - 1 == index"
                class="!bg-danger hover:!bg-danger-shade"
                type="button"
                tooltip="Hapus Data"
                @click="removeAssessor(index)"
              >
                <!-- <img class="w-6" :src="('/trash.svg')" /> -->
                -
              </kunci-button>
            </div>
          </div>
        </div>
      </div>
    </create-page>
  </div>
</template>
<script>
import CreatePage from '~/components/CreatePage.vue';
import InputSelect from '~/components/InputSelect.vue'
import KunciButton from '~/components/KunciButton.vue';
export default {
  components: { InputSelect, KunciButton, CreatePage },
  layout: 'admin',
  data() {
    return {
      items: {
        certification_id: '',
        name: '',
        school_name: '',
        date_start_registration: '',
        date_finish_registration: '',
        date_start: '',
        date_finish: '',
        assessor: [''], // 1 is initial value for looping
      },
      skemaItems: [],
      assessorItems: [],
    }
  },
  computed: {
    minDate() {
      return new Date().toISOString().substr(0, 10)
    }
  },
  methods: {
    // fetch skema
    async fetchSkema(search) {
      await this.$axios.$get('certification-scheme', {
        params: {
          // page: currentPage || this.pagination.current_page,
          search,
          // limit: this.pagination.per_page,
        }
      }).then(res => {
        if (res) {
          this.skemaItems = res.data.rows.map(item => {
            return {
              value: item.id,
              label: item.name,
            }
          });
          // this.pagination.current_page = res.data.current_page
          // this.pagination.total = res.data.total_items
          // this.pagination.last_page = res.data.total_pages

          // const split = res.data.displayed_items.split('-')

          // this.pagination.from = parseInt(split[0])
          // this.pagination.to = parseInt(split[1])
        }
      })
    },

    // selected schema for item input
    schemeSelected(e) {
      this.items.certification_id = e
    },

    // fetch assesorr
    async fetchAssessor(search) {
      await this.$axios.$get('assessor', {
        params: {
          // page: currentPage || this.pagination.current_page,
          search,
          // limit: this.pagination.per_page,
        }
      }).then(res => {
        if (res) {
          this.assessorItems = res.data.rows.map(item => {
            return {
              value: item.id,
              label: item.name,
            }
          });
          // this.pagination.current_page = res.data.current_page
          // this.pagination.total = res.data.total_items
          // this.pagination.last_page = res.data.total_pages

          // const split = res.data.displayed_items.split('-')

          // this.pagination.from = parseInt(split[0])
          // this.pagination.to = parseInt(split[1])
        }
      })
    },

    // add assessor
    addAssessor(index) {
      this.items.assessor.push('')
    },
    // remove assessor
    removeAssessor(index) {
      this.items.assessor.splice(index, 1)
    },

    // selected assessor for item input
    assessorSelected(e, index) {
      this.items.assessor[index] = e
    },
  },
}
</script>

<style>
</style>
