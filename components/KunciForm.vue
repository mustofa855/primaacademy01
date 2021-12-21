<template>
  <form @submit.prevent="submit"></form>
</template>

<script>
export default {
  name: 'FormSubmit',
  props: {
    items: {
      type: Object,
      default: () => ({}),
      required: true,
    },
    endpoint: {
      type: String,
      default: '',
      required: true,
    },
    itemUpdateId: {
      type: String,
      default: '',
      required: false,
    },
  },

  methods: {
    submit() {
      const formData = new FormData(this.$el);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });
      if (this.itemUpdateId) {
        data.id = this.itemUpdateId;
        this.$axios.post(`${this.endpoint}/${this.itemUpdateId}`, data).then(() => {
          this.$emit('submit');
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
      } else {
        this.$axios.post(this.endpoint, data).then(() => {
          this.$emit('submit');
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
      }
    },
  },
}
</script>
