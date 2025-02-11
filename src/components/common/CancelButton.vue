<template>
  <PrimaryButton :buttonName="buttonName" @click="goBack" />
</template>

<script>
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CancelButton',
  components: { PrimaryButton },
  props: {
    buttonName: {
      type: String,
      required: true,
    },
  },
  emits: ['goBack'],
  methods: {
    goBack() {
      this.$emit('goBack');
    },
  },
});
</script>
