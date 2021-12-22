<template>
  <div
    class="hover:bg-gray-100 duration-200 ease-out transition max-w-xs w-80 bg-white p-4 shadow-md rounded-lg mr-4 flex items-center"
    :class="to ? 'cursor-pointer' : ''"
    @click="toPage(to)"
  >
    <!-- icon -->
    <div class="bg-primary rounded-full w-12 h-12 flex mr-4">
      <img :src="(`/${icon}`)" class="m-auto w-8" />
    </div>
    <!-- title -->
    <h2 class="font-bold text-xl">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Title of the card
     * @type {String}
     */
    title: {
      type: String,
      default: '',
    },
    /**
     * icon from static folder use the extension name
     * @type {String}
     * @default paper.svg
     */
    icon: {
      type: String,
      default: 'paper.svg',
    },
    to: {
      type: String,
      default: '',
    },
  },
  methods: {
    toPage(e) {
      if (e)
        this.$router.push(this.$route.name + '/' + e)
    }
  },
}
</script>
