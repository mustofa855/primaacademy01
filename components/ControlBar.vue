<template>
  <div class="flex justify-between items-center mb-4">
    <!-- searchbar -->
    <div class>
      <input
        type="text"
        placeholder="Cari Data"
        class="w-80 shadow-md rounded-md p-2 px-4 transition focus:ring focus:ring-primary outline-none"
      />
    </div>

    <!-- action button -->
    <div>
      <kunci-button @click="click">{{ buttonName }}</kunci-button>
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
  },
  methods: {
    click() {
      this.$emit('buttonClick')
    },
  },

}
</script>

<style>
</style>
