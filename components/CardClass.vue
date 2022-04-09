<template>
  <card
    class="flex flex-col flex-wrap gap-4 max-w-sm max-h-sm hover:cursor-pointer"
    @click="$emit('click')"
  >
    <img :src="image" :alt="title" class="max-w-xs m-auto" />
    <h2 class="text-xl font-semibold">{{ title }}</h2>
    <template #actions>
      <div>
        <kunci-button
          class="rounded-full p-2 px-2"
          :color="'secondary'"
          @click="toDetail"
        >
          <img class="w-8" :src="'/edit.svg'" />
        </kunci-button>
      </div>
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
    id: {
      type: String,
      default: '',
    },
  },
  methods: {
    toDetail() {
      this.$store.commit('class/SET_ID', this.id)
      this.$router.push(`${this.$route.path}/update`)
    },
  },
}
</script>

<style></style>
