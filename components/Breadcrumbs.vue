<template>
  <ol class="list-reset flex text-grey-dark">
    <div v-for="(item, index) in items" :key="index">
      <div v-if="item.active" class="flex">
        <li>
          <nuxt-link :to="item.to">{{ item.label }}</nuxt-link>
        </li>
        <li>
          <span class="mx-2">/</span>
        </li>
      </div>
      <li v-else class="font-semibold">{{ item.label }}</li>
    </div>
  </ol>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  props: {
    /**
     * @example
     * {
     *  label: 'Pendaftaran',
     *  to: '/pendaftaran',
     * active: true,  }
     */
    items: {
      type: Array,
      default: () => [],
    },
  }
}
</script>
