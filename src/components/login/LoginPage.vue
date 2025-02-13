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
            <label for="username" data-id="username-label">Email</label>
            <input
              id="username"
              data-id="username"
              type="text"
              v-model="username"
              placeholder="Enter your email"
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
            :disabled="!isFormValid || isDisabled"
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
            <label for="username" data-id="username-label">Email</label>
            <input
              id="username"
              data-id="username"
              type="text"
              v-model="username"
              placeholder="Enter your email"
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

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useToast } from 'vue-toastification';
import api from '@/services/axios';
import { useRouter } from 'vue-router';

const { setToken } = useAuth();
const toast = useToast();
const router = useRouter();

// Reactive state
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const rememberMe = ref(false);
const showPassword = ref(false);
const isLoginForm = ref(true);
const errors = ref({
  username: '',
  password: '',
  confirmPassword: '',
});
const isDisabled = ref(false);
// Computed properties
const isFormValid = computed(() => {
  if (isLoginForm.value) {
    return username.value.trim() !== '' && password.value.trim() !== '';
  } else {
    return (
      username.value.trim() !== '' &&
      password.value.trim() !== '' &&
      confirmPassword.value.trim() !== '' &&
      password.value === confirmPassword.value
    );
  }
});

const passwordIconClass = computed(() => {
  return showPassword.value ? 'fa fa-eye' : 'fa fa-eye-slash';
});

// Methods
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
  resetForm();
};

const resetForm = () => {
  username.value = '';
  password.value = '';
  confirmPassword.value = '';
  errors.value = {
    username: '',
    password: '',
    confirmPassword: '',
  };
};

const validateInputs = () => {
  let isValid = true;

  // Reset errors
  errors.value = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!username.value) {
    errors.value.username = 'Email is required.';
    isValid = false;
  } else if (!emailRegex.test(username.value)) {
    errors.value.username = 'Please enter a valid email.';
    isValid = false;
  }

  // Password validation - min 8 character max 16, with specific rules
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password.value) {
    errors.value.password = 'Password is required.';
    isValid = false;
  } else if (!passwordRegex.test(password.value)) {
    errors.value.password =
      'Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one special character, and one digit.';
    isValid = false;
  }

  // Confirm password validation (only for signup form)
  if (!isLoginForm.value) {
    if (!confirmPassword.value) {
      errors.value.confirmPassword = 'Please confirm your password.';
      isValid = false;
    } else if (password.value !== confirmPassword.value) {
      errors.value.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }
  }

  return isValid;
};

const handleLogin = async () => {
  if (!validateInputs()) return;
  isDisabled.value = true;
  try {
    const response = await api.post('/auth/login', {
      email: username.value,
      password: password.value,
    });

    const token = response?.data?.token;
    setToken(token);

    toast.success('Login Success!', {
      position: 'top-right',
      timeout: 3000,
      onClose: () => {
        router.push('/dashboard'), (isDisabled.value = false);
      },
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Login failed.', {
      position: 'top-right',
      timeout: 3000,
    });
    isDisabled.value = false;
  }
};

const handleSignup = async () => {
  if (!validateInputs()) return;
  isDisabled.value = true;
  try {
    await api.post('/auth/signup', {
      email: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });

    toast.success('Signup Success, Please Login!', {
      position: 'top-right',
      timeout: 3000,
      onClose: () => {
        toggleForm(), (isDisabled.value = false);
      },
    });
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Signup failed.', {
      position: 'top-right',
      timeout: 3000,
    });
    isDisabled.value = false;
  }
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

.input-group label {
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
  display: block;
  font-size: 14px;
  color: #555;
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
