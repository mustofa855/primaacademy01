<template>
  <div>
    <create-page
      :title="'Tambah Video Baru'"
      :subtitle="'Tambah Video Baru'"
      :form-title="'Form Tambah Video'"
      endpoint="learning/create-learning"
      :items="items"
      :redirect="`/class/${$store.state.class.name}`"
      :back="`/class/${$store.state.class.name}`"
      :select2="true"
      :is-form-data="true"
    >
      <div class="grid grid-cols-2 gap-4">
        <!-- section 1 -->
        <div>
          <FormulateInput
            v-model="items.name"
            type="text"
            label="Nama Kelas"
            placeholder="Nama Kelas"
            validation="required"
            error-behavior="live"
          />
          <FormulateInput
            v-model="items.description"
            type="textarea"
            label="Deskripsi Kelas"
            validation="required"
            error-behavior="live"
          />
          <div class="flex flex-row gap-4">
            <FormulateInput
              v-model="items.is_premium"
              :options="{ 2: 'Tidak' }"
              type="checkbox"
              label="Premium Kelas?"
              input-class="flex items-start"
              error-behavior="live"
            />
            <FormulateInput
              v-model="items.is_task"
              :options="{ 2: 'Tidak' }"
              type="checkbox"
              label="Ujian Praktek?"
              input-class="flex items-start"
              error-behavior="live"
            />
          </div>
        </div>
        <!-- section 2 -->
        <div class="flex flex-col gap-4">
          <!-- input accept only video -->
          <!-- <FormulateInput
            type="file"
            label="Pilih Video"
            help="Pilih video yang akan diupload."
            @input="image"
          /> -->

          <div>
            <h3 class="font-semibold">Pilih Video</h3>
            <!-- input video -->
            <video v-show="items.video != ''" id="video-preview" controls />
            <input type="file" accept="video/*" @change="handleFileUpload" />
          </div>
          <div>
            <h3 class="font-semibold">Role</h3>
            <multiselect
              v-model="skill"
              class="rounded-full"
              placeholder="Pilih Skill"
              label="name"
              track-by="id"
              deselect-label="Hapus"
              selected-label="Pilih"
              select-label="Tambah"
              :options="skillList"
              :multiple="true"
              :taggable="true"
            />
          </div>
        </div>
      </div>
    </create-page>
  </div>
</template>

<script>
import CreatePage from '~/components/CreatePage.vue'
// import InputSelect from '~/components/InputSelect.vue'
// import KunciButton from '~/components/KunciButton.vue'
export default {
  components: {
    // InputSelect,
    // KunciButton,
    CreatePage,
  },
  layout: 'admin',
  data() {
    return {
      items: {
        name: '',
        description: '',
        video: '',
        is_premium: '',
        is_task: '',
        class_id: this.$store.state.class.id,
        skill: [],
      },
      category: [],
      level: [],
      skill: [],
      skillList: [],
    }
  },
  watch: {
    skill(e) {
      this.items.skill = e.map((item) => {
        return item.id
      })
    },
  },
  mounted() {
    this.getCategory()
    this.getLevel()
    this.getSkill()
  },
  methods: {
    handleFileUpload(e) {
      if (e) {
        // get video
        this.items.video = e.target.files[0]
        this.previewVideo()
        // eslint-disable-next-line no-console
        console.log(this.items)
      }
    },
    previewVideo() {
      const video = document.getElementById('video-preview')
      const reader = new FileReader()

      reader.readAsDataURL(this.items.video)
      reader.addEventListener('load', function () {
        video.src = reader.result
      })
    },
    getCategory() {
      this.$axios.$get('class_category/get').then((res) => {
        this.category = res.data.map((e) => {
          return {
            value: e.id,
            label: e.name,
          }
        })
      })
    },
    getLevel() {
      this.$axios.$get('class_level/get').then((res) => {
        this.level = res.data.map((e) => {
          return {
            value: e.id,
            label: e.name,
          }
        })
      })
    },
    getSkill() {
      this.$axios
        .$get(`/skill/get`, {
          params: {
            limit: 10,
            sortBy: 'id',
            orderBy: 'desc',
          },
        })
        .then(({ data }) => {
          this.skillList = data.map((e) => ({
            id: e.id,
            name: e.name,
          }))
        })
    },
  },
}
</script>

<style></style>
