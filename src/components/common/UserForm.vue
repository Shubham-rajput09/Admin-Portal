<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <!-- Basic Info Section -->
      <div class="section">
        <h2>Basic Info</h2>
        <div
          v-for="field in basicInfoFields"
          :key="field.id"
          class="form-group"
        >
          <label :for="field.id">{{ field.label }}</label>
          <input
            :id="field.id"
            v-model="form[field.model]"
            :type="field.type"
            :placeholder="field.placeholder"
            :required="field.required"
            :data-id="field.id"
            class="full-width-input"
          />
        </div>

        <!-- Select Group(s) Dropdown -->
        <div class="form-group">
          <label for="groups">Select Group(s)</label>
          <select
            data-id="groups"
            id="groups"
            v-model="form.groups"
            class="select-group"
          >
            <option value="">Select Group(s)</option>
            <option
              v-for="group in groups"
              :key="group.value"
              :value="group.value"
              :data-id="group.value"
            >
              {{ group.label }}
            </option>
          </select>
        </div>
      </div>

      <div class="divider">
        <span></span>
      </div>

      <!-- Settings and Permissions Section -->
      <div class="section">
        <h2>Settings and Permissions</h2>
        <div class="user-type">
          <select
            data-id="userType"
            id="userType"
            v-model="form.userType"
            required
          >
            <option
              v-for="option in userTypeOptions"
              :key="option.value"
              :value="option.value"
              :data-id="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>

      <!-- User Type Section (Moved after Settings and Permissions) -->
      <div class="section">
        <div
          v-for="(label, key) in permissionFields"
          :key="key"
          class="form-group"
        >
          <label>
            <input
              type="checkbox"
              v-model="form.permissions[key]"
              :data-id="`permission-${key}`"
            />
            {{ label }}
          </label>
        </div>
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
            <input
              type="radio"
              v-model="form.extensionOption"
              :value="key"
              :data-id="`extension-${key}`"
            />
            {{ label }}
          </label>
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
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        confirmEmail: '',
        groups: '',
        userType: '',
        permissions: {
          serviceAnnouncements: false,
          webAccess: true,
          sendEmail: true,
          manageCallerId: false,
          manageCallBlocking: false,
        },
        extensionOption: '',
      },
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
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.form);
    },
  },
};
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

.form-container {
  max-width: 800px;
  width: 100%; /* Make it responsive */
  padding: 20px;
  border-radius: 8px;
  margin-left: 400px;
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
  margin-bottom: 10px;
  margin-top: 10px;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-top: 25px;
  margin-bottom: 15px;
}

.form-group {
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
</style>
