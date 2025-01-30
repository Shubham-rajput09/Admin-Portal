<template>
  <div class="login-page" data-id="login-page">
    <!-- Left Section -->
    <div class="left-section" data-id="left-section">
      <img
        src="/assets/illustration.png"
        alt="Collaboration Illustration"
        class="illustration-full"
        data-id="illustration"
      />
    </div>

    <!-- Right Section -->
    <div class="right-section" data-id="right-section">
      <div class="login-container" data-id="login-container">
        <img
          src="/assets/vonage-icon.jpg"
          alt="Vonage Logo"
          class="logo"
          data-id="logo"
        />

        <!-- Toggle between Login and Signup -->
        <h2 data-id="form-heading">
          {{
            isLoginForm
              ? 'Log in to Vonage Business Communications'
              : 'Sign up for Vonage Business Communications'
          }}
        </h2>

        <!-- Login Form -->
        <form
          v-if="isLoginForm"
          @submit.prevent="handleLogin"
          data-id="login-form"
        >
          <!-- Username Input -->
          <div class="input-group" data-id="username-input-group">
            <label for="username" data-id="username-label">Username</label>
            <input
              id="username"
              data-id="username"
              type="text"
              v-model="username"
              placeholder="Enter your username"
            />
            <p
              v-if="errors.username"
              class="error-message"
              data-id="username-error"
            >
              {{ errors.username }}
            </p>
          </div>

          <!-- Password Input with Toggle -->
          <div class="input-group" data-id="password-input-group">
            <label for="password" data-id="password-label">Password</label>
            <div class="password-wrapper" data-id="password-wrapper">
              <input
                id="password"
                data-id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Enter your password"
              />
              <span
                class="toggle-password"
                @click="togglePasswordVisibility"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                data-id="toggle-password"
              >
                <i
                  :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                  data-id="password-icon"
                ></i>
              </span>
            </div>
            <p
              v-if="errors.password"
              class="error-message"
              data-id="password-error"
            >
              {{ errors.password }}
            </p>
          </div>

          <!-- Remember Me and Forgot Password -->
          <div class="remember-section" data-id="remember-section">
            <input
              type="checkbox"
              data-id="remember-me"
              id="rememberMe"
              v-model="rememberMe"
            />
            <label for="rememberMe" data-id="remember-label">Remember me</label>
            <a
              href="#"
              class="forgot-link"
              @click.prevent="$router.push('/forgot-password')"
              data-id="forgot-password-link"
            >
              Forgot password?
            </a>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            class="login-button"
            :disabled="!isFormValid"
            data-id="login-button"
          >
            Login
          </button>

          <!-- Divider -->
          <div class="divider" data-id="divider">
            <span>OR</span>
          </div>

          <!-- Single Sign-On Button -->
          <button type="button" class="sso-button" data-id="sso-button">
            Log in with Single Sign-On
          </button>
        </form>

        <!-- Signup Form -->
        <form v-else @submit.prevent="handleSignup" data-id="signup-form">
          <!-- Username Input -->
          <div class="input-group" data-id="username-input-group">
            <label for="username" data-id="username-label">Username</label>
            <input
              id="username"
              data-id="username"
              type="text"
              v-model="username"
              placeholder="Enter your username"
            />
            <p
              v-if="errors.username"
              class="error-message"
              data-id="username-error"
            >
              {{ errors.username }}
            </p>
          </div>

          <!-- Password Input with Toggle -->
          <div class="input-group" data-id="password-input-group">
            <label for="password" data-id="password-label">Password</label>
            <div class="password-wrapper" data-id="password-wrapper">
              <input
                id="password"
                data-id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Enter your password"
              />
              <span
                class="toggle-password"
                @click="togglePasswordVisibility"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                data-id="toggle-password"
              >
                <i :class="passwordIconClass" data-id="password-icon"></i>
              </span>
            </div>
            <p
              v-if="errors.password"
              class="error-message"
              data-id="password-error"
            >
              {{ errors.password }}
            </p>
          </div>

          <!-- Confirm Password Input -->
          <div class="input-group" data-id="confirm-password-input-group">
            <label for="confirmPassword" data-id="confirm-password-label"
              >Confirm Password</label
            >
            <div class="password-wrapper" data-id="password-wrapper">
              <input
                id="confirmPassword"
                data-id="confirm-password"
                :type="showPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="Confirm your password"
              />
              <span
                class="toggle-password"
                @click="togglePasswordVisibility"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                data-id="toggle-password"
              >
                <i
                  :class="showPassword ? 'fa fa-eye' : 'fa fa-eye-slash'"
                  data-id="password-icon"
                ></i>
              </span>
            </div>
            <p
              v-if="errors.confirmPassword"
              class="error-message"
              data-id="confirm-password-error"
            >
              {{ errors.confirmPassword }}
            </p>
          </div>

          <!-- Signup Button -->
          <button
            type="submit"
            class="login-button"
            :disabled="!isFormValid"
            data-id="signup-button"
          >
            Sign Up
          </button>

          <!-- Divider -->
          <div class="divider" data-id="divider">
            <span>OR</span>
          </div>

          <!-- Single Sign-On Button -->
          <button type="button" class="sso-button" data-id="sso-button">
            Sign up with Single Sign-On
          </button>
        </form>

        <!-- Toggle Link and Contact Us Button -->
        <div class="signup-link" data-id="signup-link">
          {{
            isLoginForm
              ? "Don't have an account yet?"
              : 'Already have an account?'
          }}
          <a href="#" @click.prevent="toggleForm" data-id="toggle-form-link">
            {{ isLoginForm ? 'Sign up' : 'Log in' }}
          </a>
        </div>

        <!-- Contact Us Button -->
        <div class="contact-us-section" data-id="contact-us-section">
          <button
            type="button"
            class="contact-us-button"
            @click="$router.push('/contact-us')"
            data-id="contact-us-button"
          >
            Contact Us
          </button>
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
      confirmPassword: '', // New field for signup form
      rememberMe: false,
      showPassword: false,
      isLoginForm: true, // Tracks whether to show login or signup form
      errors: {
        username: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  computed: {
    isFormValid() {
      if (this.isLoginForm) {
        return this.username.trim() !== '' && this.password.trim() !== '';
      } else {
        return (
          this.username.trim() !== '' &&
          this.password.trim() !== '' &&
          this.confirmPassword.trim() !== '' &&
          this.password === this.confirmPassword
        );
      }
    },
    // Computed property for the password icon class
    passwordIconClass() {
      return this.showPassword ? 'fa fa-eye' : 'fa fa-eye-slash';
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleForm() {
      this.isLoginForm = !this.isLoginForm;
      this.resetForm();
    },
    resetForm() {
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.errors = {
        username: '',
        password: '',
        confirmPassword: '',
      };
    },
    validateInputs() {
      let isValid = true;

      // Reset errors
      this.errors.username = '';
      this.errors.password = '';
      this.errors.confirmPassword = '';

      // Username validation
      if (!this.username) {
        this.errors.username = 'Username is required.';
        isValid = false;
      } else if (
        !/^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.username)
      ) {
        this.errors.username = 'Please enter a valid email address.';
        isValid = false;
      }

      // Password validation
      if (!this.password) {
        this.errors.password = 'Password is required.';
        isValid = false;
      } else if (this.password.length < 6) {
        this.errors.password = 'Password must be at least 6 characters.';
        isValid = false;
      }

      // Confirm password validation (only for signup form)
      if (!this.isLoginForm) {
        if (!this.confirmPassword) {
          this.errors.confirmPassword = 'Please confirm your password.';
          isValid = false;
        } else if (this.password !== this.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match.';
          isValid = false;
        }
      }

      return isValid;
    },
    handleLogin() {
      const isValid = this.validateInputs();
      if (!isValid) {
        return;
      }
      this.$router.push('/dashboard');
    },
    handleSignup() {
      const isValid = this.validateInputs();
      if (!isValid) {
        return;
      }
      // Handle signup logic here
      console.log('Signup successful!');
      this.$router.push('/dashboard');
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
.contact-us-section {
  margin-top: 20px;
  text-align: center;
}

.contact-us-button {
  background-color: transparent;
  color: #6c5ce7;
  border: 1px solid #6c5ce7;
  padding: 10px 20px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.contact-us-button:hover {
  background-color: #6c5ce7;
  color: #fff;
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
  padding-right: 40px; /* Add space for the eye icon */
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box; /* Ensure padding is included in the width */
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.password-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
  font-size: 16px;
}

.toggle-password:hover {
  color: #6c5ce7;
}

.remember-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-section label {
  margin-left: 5px; /* Adjust spacing between checkbox and label */
}

.forgot-link {
  font-size: 12px;
  color: #6c5ce7;
  text-decoration: none;
  margin-left: auto;
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

.login-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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
