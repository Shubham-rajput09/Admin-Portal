<template>
  <div class="form-header" data-id="form-header">
    <div class="add-users">Add User</div>
    <CancelButton buttonName="Cancel" class="cancel" @click="goBack" />
  </div>
  <div class="form-container">
    <form @submit="onSubmit">
      <!-- Basic Info Section -->
      <div class="section">
        <h2>Basic Info</h2>
        <div
          v-for="field in basicInfoFields"
          :key="field.id"
          class="form-group"
        >
          <label :for="field.id">{{ field.label }}</label>
          <Field
            :id="field.id"
            :name="field.model"
            :type="field.type"
            :placeholder="field.placeholder"
            :data-id="field.id"
            :rules="field.validation"
            class="full-width-input"
          />
          <ErrorMessage :name="field.model" class="error-msg" />
        </div>
        <!-- Select Group(s) Dropdown -->
        <div class="form-group">
          <label for="groups">Select Group(s)</label>
          <Field
            as="select"
            name="groups"
            data-id="groups"
            id="groups"
            class="select-group"
          >
            <option
              v-for="group in groups"
              :key="group.value"
              :value="group.value"
              :data-id="group.value"
            >
              {{ group.label }}
            </option>
          </Field>
          <ErrorMessage name="groups" class="error-msg" />
        </div>
      </div>
      <div class="divider">
        <span></span>
      </div>

      <!-- Settings and Permissions Section -->
      <div class="section">
        <h2>Settings and Permissions</h2>
        <div class="user-type">
          <Field as="select" name="userType" data-id="userType" id="userType">
            <option
              v-for="option in userTypeOptions"
              :key="option.value"
              :value="option.value"
              :data-id="option.value"
            >
              {{ option.text }}
            </option>
          </Field>
        </div>
        <ErrorMessage name="userType" class="error-msg" />
      </div>

      <div class="section">
        <div
          v-for="(label, key) in permissionFields"
          :key="key"
          class="form-group"
        >
          <label>
            <Field
              name="permissions"
              :value="key"
              type="checkbox"
              :data-id="`permission-${key}`"
            />
            {{ label }}
          </label>
        </div>
        <ErrorMessage
          data-id="error-permissions"
          name="permissions"
          class="error-msg"
        />
      </div>

      <div class="divider">
        <span></span>
      </div>

      <!-- Extensions Section -->
      <div class="section">
        <h2>Extensions</h2>
        <div
          v-for="(label, key) in extensionOptions"
          :key="key"
          class="form-group"
        >
          <label>
            <Field
              type="radio"
              name="extensionOption"
              :value="key"
              :data-id="`extension-${key}`"
            />
            {{ label }}
          </label>
        </div>
        <ErrorMessage
          data-id="error"
          name="extensionOption"
          class="error-msg"
        />
      </div>

      <div
        data-id="notice"
        v-if="form.extensionOption === 'purchase'"
        class="notice"
      >
        You will be brought to the store to purchase an extension after saving
        the user. Once you have purchased an extension, go to the Extensions
        page to assign the extension to this user.
      </div>

      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import CancelButton from '@/components/common/CancelButton.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { Field, ErrorMessage, CancelButton },
  methods: {
    handleEvent(event) {
      if (event.key == 'Escape') {
        this.$router.back();
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleEvent);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleEvent);
  },
  setup() {
    const toast = useToast();
    const schema = yup.object({
      firstName: yup
        .string()
        .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
        .required('First name is required'),
      lastName: yup
        .string()
        .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
        .required('Last name is required'),
      username: yup.string().required('Username is required'),
      email: yup
        .string()
        .email('Email is not valid')
        .required('Email is required'),
      confirmEmail: yup
        .string()
        .oneOf([yup.ref('email')], 'Email must match')
        .required('Confirm email is required'),
      groups: yup.string().required('Please select a group'),
      userType: yup.string().required('Please select a user type'),
      extensionOption: yup.string().required('Please select an extension'),
      permissions: yup.array().min(1, 'Please select at least one permission'),
    });

    const {
      handleSubmit,
      values: form,
      resetForm,
    } = useForm({
      validationSchema: schema,
      initialValues: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        confirmEmail: '',
        groups: '',
        userType: '',
        extensionOption: '',
        permissions: [],
      },
    });

    const onSubmit = handleSubmit((values) => {
      console.log(values);
      toast.success('Form submitted successfully!', {
        position: 'top-right',
        timeout: 3000,
      });
      resetForm();
    });

    const router = useRouter();
    const goBack = () => {
      router.back();
    };
    return {
      form,
      onSubmit,
      goBack,
      basicInfoFields: [
        {
          id: 'firstName',
          model: 'firstName',
          type: 'text',
          label: 'First Name*',
          placeholder: 'Enter first name',
          required: true,
        },
        {
          id: 'lastName',
          model: 'lastName',
          type: 'text',
          label: 'Last Name*',
          placeholder: 'Enter last name',
          required: true,
        },
        {
          id: 'username',
          model: 'username',
          type: 'text',
          label: 'Username*',
          placeholder: 'Enter username',
          required: true,
        },
        {
          id: 'email',
          model: 'email',
          type: 'email',
          label: 'Email*',
          placeholder: 'Enter email',
          required: true,
        },
        {
          id: 'confirmEmail',
          model: 'confirmEmail',
          type: 'email',
          label: 'Confirm Email*',
          placeholder: 'Confirm email',
          required: true,
        },
      ],
      groups: [
        { value: '', label: 'Select Group' },
        { value: 'group1', label: 'Group 1' },
        { value: 'group2', label: 'Group 2' },
        { value: 'group3', label: 'Group 3' },
      ],
      userTypeOptions: [
        { value: '', text: 'Select User Type' },
        { value: 'accountAdmin', text: 'V Account Administrator' },
        { value: 'billingAdmin', text: 'Billing Admin' },
        { value: 'callQueuesAdmin', text: 'Call Queues Admin' },
        {
          value: 'callQueuesReportingAdmin',
          text: 'Call Queues Reporting Admin',
        },
        { value: 'endUser', text: 'End User' },
        { value: 'endUserNoDashboard', text: 'End User No Dashboard' },
        { value: 'reportsAdmin', text: 'Reports Admin' },
        { value: 'usersAdmin', text: 'Users Admin' },
      ],
      permissionFields: {
        serviceAnnouncements:
          'Update this user with important service announcements',
        webAccess: 'Allow web and mobile app access',
        sendEmail: 'Send new user email',
        manageCallerId:
          'Allow this user to set and block the Outbound Caller ID for their extension(s)',
        manageCallBlocking:
          'Allow this user to manage Call Blocking for their extension(s)',
      },
      extensionOptions: {
        assign: 'Assign an available extension',
        purchase: 'Purchase a new extension',
        none: 'User does not need an extension',
      },
    };
  },
});
</script>

<style scoped>
/* Reset margin and padding for the body */
body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
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
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-users {
  font-size: 15px;
  margin-left: 22px;
  color: black;
  font-weight: bold;
  margin-bottom: 20px;
}
.cancel {
  padding: 1px 1px 2px 2px;
  margin-left: 10px;
  margin-bottom: 25px;
}

.form-container {
  max-width: 800px;
  width: 100%; /* Make it responsive */
  padding: 20px;
  border-radius: 8px;
  margin-left: 400px;
  margin-top: 25px;
}
.select-group {
  height: 45px;
  width: 180px;
  margin-top: 10px;
}
.section {
  margin-bottom: 20px;
}
.full-width-input {
  width: 500px;
  height: 20px;
  color: black;
  border: 1px solid rgba(9, 8, 8, 0.64);
  margin-top: 10px;
}
.submit-btn {
  padding: 10px;
  background: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-top: 25px;
  margin-bottom: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.user-type {
  margin-top: 25px;
  width: 80px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.notice {
  font-size: 0.9rem;
  color: #d9534f;
  background-color: #f9e2e2;
  padding: 10px;
  border: 1px solid #d6b3b3;
  border-radius: 4px;
  margin-bottom: 10px;
}
.divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #888;
}
.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #ddd;
  margin: 0 0px;
}
/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 10px;
  }
}
.error-msg {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}
</style>
