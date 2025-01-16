<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <!-- Basic Info Section -->
      <div class="section">
        <h2>Basic Info</h2>

        <div class="form-group">
          <label for="firstName">First Name*</label>
          <input id="firstName" v-model="form.firstName" type="text" placeholder="Enter first name" required class="full-width-input" />
        </div>

        <div class="form-group">
          <label for="lastName">Last Name*</label>
          <input id="lastName" v-model="form.lastName" type="text" placeholder="Enter last name" required class="full-width-input" />
        </div>

        <div class="form-group">
          <label for="username">Username*</label>
          <input id="username" v-model="form.username" type="text" placeholder="Enter username" required class="full-width-input" />
        </div>

        <div class="form-group">
          <label for="email">Email*</label>
          <input id="email" v-model="form.email" type="email" placeholder="Enter email" required class="full-width-input" />
        </div>

        <div class="form-group">
          <label for="confirmEmail">Confirm Email*</label>
          <input id="confirmEmail" v-model="form.confirmEmail" type="email" placeholder="Confirm email" required class="full-width-input" />
        </div>

        <div class="form-group">
          <label for="groups">Select Group(s)</label>
          <select id="groups" v-model="form.groups">
            <option value="">Select Group(s)</option>
          </select>
        </div>
      </div>

      <!-- Settings and Permissions Section -->
      <div class="section">
        <h2>Settings and Permissions</h2>

        <div class="form-group">
          <label for="userType">User Type*</label>
          <select id="userType" v-model="form.userType" required>
            <option value="">Select User Type</option>
            <option value="accountAdmin">V Account Administrator</option>
            <option value="billingAdmin">Billing Admin</option>
            <option value="callQueuesAdmin">Call Queues Admin</option>
            <option value="callQueuesReportingAdmin">Call Queues Reporting Admin</option>
            <option value="endUser">End User</option>
            <option value="endUserNoDashboard">End User No Dashboard</option>
            <option value="reportsAdmin">Reports Admin</option>
            <option value="usersAdmin">Users Admin</option>
          </select>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.permissions.serviceAnnouncements" />
            Update this user with important service announcements
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.permissions.webAccess" />
            Allow web and mobile app access
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.permissions.sendEmail" />
            Send new user email
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.permissions.manageCallerId" />
            Allow this user to set and block the Outbound Caller ID for their extension(s)
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="checkbox" v-model="form.permissions.manageCallBlocking" />
            Allow this user to manage Call Blocking for their extension(s)
          </label>
        </div>
      </div>

      <!-- Extensions Section -->
      <div class="section">
        <h2>Extensions</h2>

        <div class="form-group">
          <label>
            <input type="radio" v-model="form.extensionOption" value="assign" />
            Assign an available extension
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="radio" v-model="form.extensionOption" value="purchase" />
            Purchase a new extension
          </label>
        </div>

        <div class="form-group">
          <label>
            <input type="radio" v-model="form.extensionOption" value="none" />
            User does not need an extension
          </label>
        </div>

        <div v-if="form.extensionOption === 'purchase'" class="notice">
          You will be brought to the store to purchase an extension after saving the user. Once you have purchased an extension, go to the Extensions page to assign the extension to this user.
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
    };
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.form);
    },
  },
};
</script>

<style>
/* Reset margin and padding for the body */
body {
  background-color: #f5f5f5;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Center the form-container */
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full height to center vertically */
  background-color: #f5f5f5;
  padding: 20px; /* Add padding for small screens */
}

.form-container {
  max-width: 800px;
  width: 100%; /* Make it responsive */
  padding: 20px;
  border-radius: 8px;
}

.section {
  margin-bottom: 20px;
}
.full-width-input {
  width: 100%;
  max-width: 100%;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.form-group {
  margin-bottom: 15px;
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

button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.notice {
  font-size: 0.9rem;
  color: #d9534f;
  background-color: #f9e2e2;
  padding: 10px;
  border: 1px solid #d6b3b3;
  border-radius: 4px;
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
