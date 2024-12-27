<template>
  <div class="password-recovery-page">
    <div class="form-container">
      <h2>Password Recovery</h2>
      <p>Enter your username to receive an email with Password Reset instructions.</p>
      <form @submit.prevent="handlePasswordRecovery">
        <div class="input-group">
          <label for="username">Username</label>
          <input
              id="username"
              type="text"
              v-model="username"
              placeholder="Enter your username"
          />
        </div>
        <div class="captcha-group">
          <input type="checkbox" id="captcha" />
          <label for="captcha">I'm not a robot</label>
        </div>
        <div class="actions">
          <button type="submit" class="submit-button">Submit</button>
          <button type="button" class="cancel-button" @click="goBack">Cancel</button>
        </div>
      </form>
      <a href="#" class="forgot-username">Forgot Username?</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    handlePasswordRecovery() {
      if (this.username) {
        alert(
            `Password recovery instructions sent to the email associated with ${this.username}`
        );
      } else {
        alert("Please enter your username.");
      }
    },
    goBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>



.password-recovery-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Allow full screen height */
  background-image: url('@/assets/rpg.png'); /* Add background image */
  background-size: cover; /* Ensure the background image covers the entire area */
  background-position: center; /* Center the background image */
  background-repeat: no-repeat; /* Prevent repeating the background image */
}

.form-container {
  width: 100%;
  max-width: 400px;
  padding: 20px 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
}

p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.input-group {
  text-align: left;
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.captcha-group {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.captcha-group input {
  margin-right: 10px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.submit-button,
.cancel-button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button {
  background-color: #a259ff;
  color: #fff;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #923ae2;
}

.cancel-button {
  background-color: #ddd;
  color: #333;
  transition: background-color 0.3s;
}

.cancel-button:hover {
  background-color: #bbb;
}

.forgot-username {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: #6c5ce7;
  text-decoration: none;
}

.forgot-username:hover {
  text-decoration: underline;
}
</style>

