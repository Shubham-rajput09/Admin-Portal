<template>
  <div class="form-header" data-id="form-header">
    <div class="add-users">Add Group</div>
    <CancelButton buttonName="Close" @click="goBack" />
  </div>
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
import CancelButton from '@/components/common/CancelButton.vue';
import { useRouter } from 'vue-router';
import { ref, computed, defineEmits, onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';
import api from '@/services/axios';
import { useAuth } from '@/composables/useAuth';

const title = 'Group Info';
const buttonText = 'Save';
const toast = useToast();

const emits = defineEmits(['submit']);

const localGroupName = ref('');
const localDescription = ref('');
const errors = ref({ groupName: '', description: '' });

const { getToken } = useAuth();

const router = useRouter();
const goBack = () => {
  router.back();
};

const handleEvent = (event) => {
  if (event.key == 'Escape') {
    goBack();
  }
};
onMounted(() => {
  window.addEventListener('keydown', handleEvent);
});
onUnmounted(() => {
  window.removeEventListener('keydown', handleEvent);
});

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

const handleSubmit = async () => {
  validateGroupName();
  validateDescription();
  if (isFormValid.value) {
    try {
      const token = getToken();
      const response = await api.post(
        '/groups',
        {
          name: localGroupName.value,
          description: localDescription.value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Include Authorization Token
          },
        },
      );
      console.log('API Response:', response.data);
      toast.success('Group Added Successfully!');
      emits('submit', response.data);
      localGroupName.value = '';
      localDescription.value = '';
    } catch (error) {
      console.error('Error adding group:', error);
      toast.error('Failed to add group');
    }
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
  padding-top: 50px;
}
.form-header {
  width: 100vw; /* Full width of the container */
  height: 30px; /* Adjust this value for thickness */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  position: fixed;
  left: 0;
  z-index: 1000;
  left: 0;
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.add-users {
  font-size: 15px;
  margin-left: 22px;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
}

.container {
  width: 500px;
  padding: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-left: 450px;
  margin-top: 80px;
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
