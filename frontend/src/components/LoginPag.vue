<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="username">Username:</label>
          <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              required
          />
        </div>

        <div class="input-group">
          <label for="password">Password:</label>
          <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
          />
        </div>

        <div class="button-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      // For demonstration, log the form data.
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      // You can add actual login logic here, like API calls for validation.
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-box {
  background-color: white;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 300px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>
