<template>
  <div class="mb-4">
    <title-bar :title="title" :subtitle="subtitle" :back="back" />

    <!-- content section -->
    <div class>
      <div class="bg-white shadow-md rounded-md">
        <!-- form title section -->
        <kunci-form
          v-slot="{ hasErrors }"
          :items="items"
          :endpoint="endpoint"
          :item-update-id="itemUpdateId"
          :redirect="redirect"
        >
          <card :title="formTitle">
            <template #default>
              <slot />
            </template>
            <template #actions>
              <kunci-button
                class="!bg-white !text-gray-600 border-gray-600 border shadow-none hover:!bg-gray-600 hover:!text-white"
                type="button"
                @click="goBack"
              >Kembali</kunci-button>
              <kunci-button type="submit" :disabled="hasErrors">Tambah</kunci-button>
            </template>
          </card>
        </kunci-form>
      </div>
    </div>
  </div>
</template>

<script>
import KunciButton from './KunciButton.vue'
import KunciForm from './KunciForm.vue'
import Card from './Card.vue'
export default {
  components: { KunciForm, KunciButton, Card },
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
  methods: {
    goBack() {
      this.$router.push(this.back)
    }
  },
}
</script>

<style>
</style>
