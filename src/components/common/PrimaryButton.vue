<template>
  <div>
    <button class="simple-button">
      {{ buttonName }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'SimpleButton',
  props: {
    buttonName: {
      type: String,
      required: true,
    },
  },
  created() {
    if (!this.buttonName) {
      throw new Error('Label prop is required');
    }
  },
};
</script>

<style scoped>
.simple-button {
  padding: 10px 15px;
  font-size: 0.9rem;
  background-color: transparent;
  color: #070000;
  border: 1.3px solid;
  border-radius: 6px;
  cursor: pointer;
  min-height: 15px;
  min-width: 60px;
  font-style: normal;
  font-weight: 550;
  text-align: center;
}

.simple-button:hover {
  background-color: rgba(14, 0, 0, 0.07);
}
</style>
