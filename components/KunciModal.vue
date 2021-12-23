<template>
  <transition>
    <div v-if="showModal" class="fixed w-screen h-screen inset-0 z-10">
      <div class="min-h-screen w-screen bg-gray-800 opacity-60" @click="click"></div>
      <div
        class="p-8 bg-white absolute inset-0 mx-auto my-auto h-3/4 max-w-lg rounded-md shadow-md"
      >
        <!-- title Section -->
        <div class="text-xl font-bold mb-8">{{ title }}</div>

        <kunci-form
          v-slot="{ hasErrors }"
          :items="items"
          :endpoint="endpoint"
          class="flex flex-col justify-between h-full"
          @submited="click"
        >
          <div>
            <slot />
          </div>

          <div class="text-right py-12">
            <kunci-button type="button" @click="click">Kembali</kunci-button>
            <kunci-button type="submit" :disabled="hasErrors">Tambah</kunci-button>
          </div>
        </kunci-form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
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
  },
  data() {
    return {
      showModal: this.show,
    }
  },
  watch: {
    show(val) {
      this.showModal = val
    },
  },
  methods: {
    click() {
      this.$emit('closed', false)
      this.showModal = !this.showModal
    }
  },
}
</script>
