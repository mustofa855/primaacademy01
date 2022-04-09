<template>
  <card class="flex flex-col flex-wrap gap-4 w-96 h-96">
    <img :src="'/logo-prima.svg'" alt="Prima Academy" class="m-auto" />
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <template #actions>
      <kunci-button class="rounded-full p-2 px-2" :color="'secondary'">
        <img class="w-8" :src="'/edit.svg'" />
      </kunci-button>
    </template>
  </card>
</template>

<script>
import Card from './Card.vue'
import KunciButton from './KunciButton.vue'
export default {
  name: 'CardClass',
  components: { Card, KunciButton },
  props: {
    title: {
      type: String,
      default: 'Card Title',
    },
    image: {
      type: String,
      default: 'Card Title',
    },
    detail: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          id: this.detail.id,
        },
      })
    },
  },
}
</script>

<style></style>
