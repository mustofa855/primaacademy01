<template>
  <button class="kbtn" :class="(dense ? 'py-1 my-1' : '') || (text ? 'kbtn-text' : '')">
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

  },

}

</script>
