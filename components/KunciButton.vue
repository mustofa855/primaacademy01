<template>
  <button
    class="bg-primary p-2 px-4 text-white rounded-md shadow-md hover:bg-primary-shade duration-200 ease-out transition"
    :class="`${disabled ? '!bg-gray-300 hover:cursor-not-allowed' : ''} ${dense ? 'p-1' : ''}`"
    @click="click"
  >
    <slot></slot>
    <!-- <router-link v-if="to" :to="to"></router-link> -->
  </button>
</template>
<script>
export default {
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
    btnColor: {
      type: String,
      default: 'primary',
    },
    dense: {
      type: Boolean,
      default: false,
    },
    fontBold: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    click() {
      this.$emit('click')
    }
  },

}

</script>
