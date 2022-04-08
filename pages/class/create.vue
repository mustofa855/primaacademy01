<template>
  <div>
    <create-page
      :title="'Tambah Kelas'"
      :subtitle="'Anda dapat menambah Kelas baru.'"
      :form-title="'Form Tambah Kelas'"
      endpoint="classes/insert"
      :items="items"
      :redirect="'/coach'"
      :back="'/coach'"
      :select2="true"
      is-form-data
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
          <FormulateInput
            v-model="items.class_category_id"
            :options="category"
            type="select"
            placeholder="Pilih Kategori"
            label="Kategori"
          />
          <FormulateInput
            v-model="items.is_premium"
            :options="{ 2: 'Tidak' }"
            type="checkbox"
            label="Premium Kelas?"
            input-class="flex items-start"
            error-behavior="live"
          />
          <FormulateInput
            v-model="items.class_level_id"
            :options="level"
            type="select"
            placeholder="Pilih Level"
            label="Level"
          />
        </div>
        <!-- section 2 -->
        <div>
          <FormulateInput
            class="maxh"
            type="image"
            label="Thumbnail Kelas"
            help="Select a png, jpg or gif to upload."
            validation="mime:image/jpeg,image/png"
            file-image-preview-image-class="max-h-96"
            @input="image"
          />
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
        is_premium: '',
        class_level_id: '',
        class_category_id: '',
        thumbnail: '',
      },
      category: [],
      level: [],
    }
  },
  mounted() {
    this.getCategory()
    this.getLevel()
  },
  methods: {
    image(e) {
      if (e) {
        // convert to base64
        const reader = new FileReader()
        reader.readAsDataURL(e.fileList[0])
        reader.onload = (e) => {
          this.items.thumbnail = e.target.result
        }
        // eslint-disable-next-line no-console
        console.log(this.items)
      }
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
  },
}
</script>

<style></style>
