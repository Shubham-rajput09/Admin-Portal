<template>
  <div data-id="heading" class="heading">{{ heading }}</div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    heading: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.heading {
  font-size: 30px;
  margin-bottom: 40px;
}
</style>
