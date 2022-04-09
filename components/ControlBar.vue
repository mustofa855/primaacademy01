<template>
  <div class="flex justify-between items-center mb-4">
    <!-- searchbar -->
    <div v-if="!customBar">
      <input
        type="text"
        :value="value"
        placeholder="Cari Data"
        class="w-80 shadow-md rounded-md p-2 px-4 transition focus:ring focus:ring-primary outline-none"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <div v-else>
      <slot />
    </div>

    <!-- action button -->
    <div v-if="!disabledButton">
      <kunci-button color="secondary" @click="click">{{
        buttonName
      }}</kunci-button>
    </div>
  </div>
</template>

<script>
import KunciButton from './KunciButton.vue'
export default {
  components: { KunciButton },
  props: {
    buttonName: {
      type: String,
      default: 'Tambah Asset baru',
    },
    value: {
      type: String,
      default: '',
    },
    disabledButton: {
      type: Boolean,
      default: false,
    },
    toPage: {
      type: String,
      default: '',
    },
    customBar: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click() {
      this.$emit('buttonClick')

      if (this.toPage) this.$router.push(this.toPage)
    },
  },
}
</script>

<style></style>
