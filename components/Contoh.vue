<template>
  <div>
    ini conohtohoh
    {{ datas }}
  </div>
</template>
<script>
export default {
  props: {
    datas: {
      type: Array,
      default: () => [],
    },

  }
}
</script>
