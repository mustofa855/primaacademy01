<!-- components/Tab.vue -->

<template>
    <div v-if="active" class="mb-4">
      <slot />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      active: {
        type: Boolean,
        default: false
      }
    }
  };
  </script>
  