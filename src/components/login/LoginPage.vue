<template>
  <div class="login-page">
    <!-- Left Section -->
    <div class="left-section">
      <img
        src="/assets/illustration.png"
        alt="Collaboration Illustration"
        class="illustration-full"
      />
    </div>

    <!-- Right Section -->
    <div class="right-section">
      <div class="login-container">
        <img src="/assets/vonage-icon.jpg" alt="Vonage Logo" class="logo" />

        <h2>Log in to Vonage Business Communications</h2>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">Username</label>
            <input
              id="username"
              type="text"
              v-model="username"
              placeholder="Enter your username"
            />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="Enter your password"
            />
          </div>
          <div class="remember-section">
            <input type="checkbox" id="rememberMe" v-model="rememberMe" />
            <label for="rememberMe">Remember me</label>
            <a
              href="#"
              class="forgot-link"
              @click.prevent="$router.push('/forgot-password')"
            >
              Forgot password?
            </a>
          </div>

          <!-- Login Button -->
          <router-link to="/dashboard">
            <button type="submit" class="login-button">Login</button>
          </router-link>

          <!-- Divider -->
          <div class="divider">
            <span>OR</span>
          </div>

          <!-- Single Sign-On Button -->
          <button type="button" class="sso-button">
            Log in with Single Sign-On
          </button>
        </form>

        <div class="signup-link">
          Don't have an account yet? <a href="/contact-us">Contact us</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
    };
  },
  methods: {
    handleLogin() {
      if (this.username && this.password) {
        this.$emit('loginSuccess');
      } else {
        alert('Please enter both username and password.');
      }
    },
  },
};
</script>

<style scoped>
/* General Layout */
.login-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

/* Left Section */
.left-section {
  flex: 1;
  background: linear-gradient(135deg, #6c5ce7, #4b3de2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.illustration-full {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Right Section */
.right-section {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  text-align: center;
}

.logo {
  max-width: 150px;
  margin-bottom: 20px;
}

h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #333;
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

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.remember-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.forgot-link {
  font-size: 12px;
  color: #6c5ce7;
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Buttons */
.login-button,
.sso-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button {
  background-color: #6c5ce7;
}

.login-button:hover {
  background-color: #5a4ad1;
}

.sso-button {
  background-color: #fff;
  color: #6c5ce7;
  border: 1px solid #6c5ce7;
}

.sso-button:hover {
  background-color: #6c5ce7;
  color: #fff;
}

/* Divider */
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
  margin: 0 10px;
}

.signup-link {
  margin-top: 20px;
  font-size: 14px;
}

.signup-link a {
  color: #6c5ce7;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 1200px) {
  .login-page {
    flex-direction: column;
    height: auto;
  }

  .left-section {
    display: none;
  }

  .right-section {
    flex: 1;
    padding: 20px;
  }

  .login-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .login-container {
    padding: 15px;
  }

  .login-button,
  .sso-button {
    font-size: 14px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .login-container {
    padding: 10px;
  }

  h2 {
    font-size: 18px;
  }
}
</style>
