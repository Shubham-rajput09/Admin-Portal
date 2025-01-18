<template>
  <div class="wrapper">
    <div class="content">
      <h2>Add Users</h2>
      <p class="subtext">
        Enter the details below for up to 25 users. Be sure to use the email
        address where you'd like them to receive any communication, including
        the link to set up their accounts.
      </p>
      <div class="email-checkbox">
        <input type="checkbox" id="welcomeEmail" />
        <label for="welcomeEmail"
          >Send welcome email to all users added below</label
        >
      </div>
      <div class="form-container">
        <input type="text" placeholder="First Name" class="input-field" />
        <input type="text" placeholder="Last Name" class="input-field" />
        <input type="email" placeholder="Email Address" class="input-field" />
        <select class="input-field">
          <option value="" disabled selected>Select an Option</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button class="add-user-btn" disabled>Add User</button>
      </div>
      <div class="empty-state">
        <div class="empty-circle">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Add user icon"
          />
        </div>
        <p>You have not yet added any users</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddBulk',
};
</script>

<style scoped>
/* General Content Styles */
/* General Content Styles */
.content {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  width: 100%; /* Ensure it spans the full width */
  max-width: none; /* Remove max-width restriction */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 0 auto;
}

.content h2 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.subtext {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  text-align: center;
}

/* Checkbox Styles */
.email-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.email-checkbox input[type='checkbox'] {
  margin-right: 10px;
}

.email-checkbox label {
  font-size: 14px;
  color: #333;
}

/* Wrapper Styles */
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full height of the viewport */
}

/* Form Styles */
.form-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.input-field {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #007bff;
}

.add-user-btn {
  padding: 10px 15px;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: not-allowed;
  font-size: 14px;
  text-align: center;
}

/* Empty State Styles */
.empty-state {
  text-align: center;
  margin-top: 50px;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
}

.empty-circle {
  width: 70px;
  height: 70px;
  background-color: #e9e9e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.empty-circle img {
  width: 40px;
  opacity: 0.8;
}

.empty-state p {
  font-size: 14px;
  color: #666;
}

/* Responsive Media Queries */

@media (max-width: 768px) {
  .content {
    padding: 10px;
  }

  .form-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 8px;
  }

  .add-user-btn {
    padding: 8px 12px;
    font-size: 12px;
  }

  .empty-circle {
    width: 60px;
    height: 60px;
  }

  .empty-circle img {
    width: 30px;
  }

  .empty-state p {
    font-size: 12px;
  }
}
@media (max-width: 480px) {
  .content h2 {
    font-size: 20px;
  }

  .subtext {
    font-size: 12px;
  }

  .form-container {
    grid-template-columns: 1fr;
  }

  .add-user-btn {
    padding: 8px 10px;
    font-size: 12px;
  }
}
</style>
