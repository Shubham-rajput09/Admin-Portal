<template>
  <div>
    <button class="secondary-button">
      {{ secondaryButton }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SecondaryButton',
  props: {
    secondaryButton: {
      type: String,
      required: true,
    },
  },
  created() {
    if (!this.secondaryButton) {
      throw new Error('Label prop is required');
    }
  },
};
</script>

<style scoped>
.secondary-button {
  border: 1.3px solid;
  border-radius: 6px;
  display: inline-block;
  font-size: 1rem;
  font-weight: 590;
  font-style: normal;
  text-align: center;
  padding: 8px 12px;
  min-height: 15px;
  min-width: 60px;
  color: #ffffff;
  background-color: #070000;
  appearance: none;
  margin-right: 500px;
}
</style>
