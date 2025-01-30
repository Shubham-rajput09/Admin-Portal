<template>
  <div class="wrapper">
    <div class="content">
      <h1>Add Users</h1>
      <p class="subtext">
        Enter the details below for up to 25 users. Be sure to use the email
        address where you'd like them to receive any communication, including
        the link to set up their accounts.
      </p>
      <div class="email-checkbox">
        <input type="checkbox" id="welcomeEmail" data-id="welcome-checkbox" />
        <label for="welcomeEmail"
          >Send welcome email to all users added below</label
        >
      </div>
      <div class="form-container">
        <div class="input-container">
          <label for="first-name">First Name</label>
          <input
            type="text"
            data-id="first-name"
            placeholder="First Name"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="last-name">Last Name</label>
          <input
            type="text"
            data-id="last-name"
            placeholder="Last Name"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="email">Email Address</label>
          <input
            type="email"
            data-id="email"
            placeholder="Email Address"
            class="input-field"
          />
        </div>
        <div class="input-container">
          <label for="select-role">User Type</label>
          <select data-id="select-role" class="input-field">
            <option value="" disabled selected>Select an Option</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button data-id="add-user-btn" class="add-user-btn" disabled>
          Add User
        </button>
      </div>
      <div class="empty-state" data-id="no-user-added">
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
.content {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  width: 100%;
  max-width: none;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 0 auto;
}

.content h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 18px;
  text-align: left;
  margin-left: 80px;
}
.subtext {
  font-size: 16px;
  color: #070000;
  margin-bottom: 30px;
  text-align: left;
  margin-left: 80px;
  font-weight: bold;
}
.email-checkbox {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-left: 75px;
}

.email-checkbox input[type='checkbox'] {
  margin-right: 10px;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border: 4px solid black;
  accent-color: #070000;
  cursor: pointer;
  margin-bottom: 10px;
}

.email-checkbox label {
  font-size: 16px;
  font-weight: normal;
  color: #0e0000;
  margin-bottom: 10px;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  padding-top: 20px;
}

.form-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;
  align-items: center;
  margin-left: 50px;
  justify-content: flex-start;
}

.input-container {
  display: flex;
  flex-direction: column;
  width: 18%;
  margin-left: 25px;
}

label {
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 15px;
  color: #787272;
}

.input-field {
  padding: 10px;
  border: 1px solid #1b1919;
  border-radius: 6px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #070000;
}

.add-user-btn {
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  background-color: #070000;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: auto;
  align-self: center;
  margin-top: 25px;
  margin-left: 30px;
}

.empty-state {
  text-align: center;
  margin-top: 50px;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  height: 300px;
  width: 1280px;
  margin-left: 75px;
}
.empty-state p {
  font-weight: bold;
  color: #0b0a0a;
  font-size: 16px;
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

@media (max-width: 768px) {
  .form-container {
    flex-direction: column;
    gap: 10px;
  }

  .input-container {
    width: 100%;
  }

  .add-user-btn {
    width: 100%;
    padding: 10px;
  }
}
</style>
