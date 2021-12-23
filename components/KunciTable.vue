<template>
  <table class="w-full">
    <!-- create table head -->
    <thead>
      <tr class="bg-primary text-left text-white">
        <th v-for="(item, index) in headerTable" :key="index" class="py-2 px-4">{{ item.text }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="index"
        class="bg-white px-4"
        :class="index % 2 == 0 ? '' : 'bg-gray-100'"
      >
        <td
          v-for="(itemHeader, indexHeader) in headerTable"
          :key="indexHeader"
          class="p-2 border-border-b-2 px-4"
        >
          <slot
            :name="itemHeader.key"
            v-bind="{ index, indexHeader, itemHeader, item }"
          >{{ item[itemHeader.key] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headerTable: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
</style>
