<template>
  <div>
    <title-bar :title="title" :subtitle="subtitle" :back="back" />

    <!-- content section -->
    <div class>
      <div class="bg-white shadow-md rounded-md">
        <!-- form title section -->
        <kunci-form
          :items="items"
          :endpoint="endpoint"
          :item-update-id="itemUpdateId"
          :redirect="redirect"
        >
          <div class="p-4 px-12">
            <div class="text-xl font-bold mb-6 mt-4">{{ formTitle }}</div>
            <slot />
          </div>

          <div class="text-right p-4 px-12">
            <kunci-button>Kembali</kunci-button>
            <kunci-button type="submit" :disabled="true">Tambah</kunci-button>
          </div>
        </kunci-form>
      </div>
    </div>
  </div>
</template>

<script>
import KunciButton from './KunciButton.vue'
import KunciForm from './KunciForm.vue'
export default {
  components: { KunciForm, KunciButton },
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    back: {
      type: String,
      default: '',
    },
    isControlbar: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    endpoint: {
      type: String,
      default: '',
      required: true,
    },
    itemUpdateId: {
      type: String,
      default: '',
      required: false,
    },
    formTitle: {
      type: String,
      default: '',
      required: true,
    },
    redirect: {
      type: String,
      default: '',
      required: false,
    },
  },
}
</script>

<style>
</style>
