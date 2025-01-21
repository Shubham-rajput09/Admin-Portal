<template>
  <div class="heading">{{ heading }}</div>
</template>

<script>
export default {
  name: 'HeadingComponent',
  props: {
    heading: {
      type: String,
      required: true,
    },
  },
  created() {
    if (!this.heading) {
      throw new Error('prop is required');
    }
  },
};
</script>

<style scoped>
.heading {
  font-size: 30px;
  margin-bottom: 40px;
}
</style>
