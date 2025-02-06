<template>
  <div class="container">
    <h2 class="title">{{ title }}</h2>
    <form @submit.prevent="handleSubmit" class="form">
      <input
        v-model="localGroupName"
        type="text"
        placeholder="Group Name*"
        class="input"
        @input="validateGroupName"
      />
      <span v-if="errors.groupName" class="error">{{ errors.groupName }}</span>

      <input
        v-model="localDescription"
        type="text"
        placeholder="Description*"
        class="input"
        @input="validateDescription"
      />
      <span v-if="errors.description" class="error">{{
        errors.description
      }}</span>

      <!-- Save button (disabled until form is valid) -->
      <button type="submit" class="button" :disabled="!isFormValid">
        {{ buttonText }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: 'Group Info',
  },
  defaultGroupName: {
    type: String,
    default: '',
  },
  defaultDescription: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: 'Save',
  },
});

const emits = defineEmits(['submit']);

const localGroupName = ref(props.defaultGroupName);
const localDescription = ref(props.defaultDescription);
const errors = ref({ groupName: '', description: '' });

// Validation for Group Name
const validateGroupName = () => {
  if (!localGroupName.value.trim()) {
    errors.value.groupName = 'Group Name is required';
  } else if (localGroupName.value.length < 3) {
    errors.value.groupName = 'Group Name must be at least 3 characters long';
  } else {
    errors.value.groupName = '';
  }
};

// Validation for Description (made required)
const validateDescription = () => {
  if (!localDescription.value.trim()) {
    errors.value.description = 'Description is required';
  } else if (localDescription.value.length > 100) {
    errors.value.description = 'Description should not exceed 100 characters';
  } else {
    errors.value.description = '';
  }
};

const isFormValid = computed(
  () =>
    !errors.value.groupName &&
    !errors.value.description &&
    localGroupName.value.trim().length >= 3 &&
    localDescription.value.trim().length > 0,
);

const handleSubmit = () => {
  validateGroupName();
  validateDescription();
  if (isFormValid.value) {
    emits('submit', {
      groupName: localGroupName.value,
      description: localDescription.value,
    });
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
  font-family: Arial, sans-serif;
}

.container {
  width: 500px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-left: 450px;
  margin-top: 200px;
}

.title {
  margin-bottom: 20px;
  color: #111;
  font-size: 22px;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  background: white;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #007bff;
  outline: none;
}

.button {
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
}

.button:hover {
  background: #0056b3;
}

.button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.error {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
