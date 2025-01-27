<template>
  <div class="input-group">
    <label :for="id">{{ label }}</label>
    <!-- Select input with v-bind for dynamic properties -->
    <select
      :id="id"
      :value="modelValue"
      :aria-label="label"
      :required="required"
      @blur="validateField"
      @change="updateValue($event)"
    >
      <option value="" disabled>Select</option>
      <option v-for="(option, index) in options" :key="index" :value="option">
        {{ option }}
      </option>
    </select>
    <!-- Error message if validation fails -->
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'VgSelect',
  props: {
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    options: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
      default: 'Select a value to proceed',
    },
  },
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    },
    validateField() {
      this.$emit(
        'update:error',
        this.required && !this.modelValue ? 'This field is required' : '',
      );
    },
  },
};
</script>

<style scoped>
.input-group {
  flex: 1;
  min-width: 250px;
}

label {
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

select:focus {
  border-color: #007bff;
  outline: none;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
</style>
