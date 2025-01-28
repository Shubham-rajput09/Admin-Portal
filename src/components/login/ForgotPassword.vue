<template>
  <div class="password-recovery-page" data-id="password-recovery-page">
    <div class="form-container" data-id="password-recovery-form">
      <h2>Password Recovery</h2>
      <p>
        Enter your username to receive an email with Password Reset
        instructions.
      </p>
      <form @submit.prevent="handlePasswordRecovery">
        <div class="input-group">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            v-model="username"
            placeholder="Enter your username"
            @blur="validateUsername"
            data-id="username-input"
          />
          <p
            v-if="errors.username"
            class="error-message"
            data-id="username-error"
          >
            {{ errors.username }}
          </p>
        </div>
        <div class="captcha-group" data-id="captcha-group">
          <input
            type="checkbox"
            id="captcha"
            v-model="captchaChecked"
            data-id="captcha-checkbox"
          />
          <label for="captcha">I'm not a robot</label>
        </div>
        <div class="actions" data-id="actions">
          <button type="submit" class="submit-button" data-id="submit-button">
            Submit
          </button>
          <button
            type="button"
            class="cancel-button"
            @click="goBack"
            data-id="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
      <a href="#" class="forgot-username" data-id="forgot-username-link"
        >Forgot Username?</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
  data() {
    return {
      username: '',
      captchaChecked: false,
      errors: {
        username: null,
      },
    };
  },
  methods: {
    validateUsername() {
      if (!this.username.trim()) {
        this.errors.username = 'Username is required.';
      } else {
        this.errors.username = null;
      }
    },
    handlePasswordRecovery() {
      this.validateUsername();

      if (!this.errors.username) {
        console.log(
          `Password recovery initiated for username: ${this.username}`,
        );
        if (this.captchaChecked) {
          console.log('Captcha checked: User verified they are not a robot.');
        } else {
          console.log(
            'Captcha not checked: Proceeding without user verification.',
          );
        }
        this.$router.push('/');
      }
    },
    goBack() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
/* Styles remain unchanged */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.password-recovery-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/rpg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
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
input[type='text'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
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
  gap: 10px;
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
@media (max-width: 768px) {
  .password-recovery-page {
    padding: 10px;
  }
  .form-container {
    padding: 15px 20px;
  }
  h2 {
    font-size: 18px;
  }
  input[type='text'] {
    font-size: 13px;
  }
  .submit-button,
  .cancel-button {
    font-size: 13px;
    padding: 8px 15px;
  }
  .actions {
    flex-direction: column;
    gap: 10px;
  }
}
@media (max-width: 480px) {
  h2 {
    font-size: 16px;
  }
  p {
    font-size: 12px;
  }
  input[type='text'] {
    font-size: 12px;
    padding: 10px;
  }
  .submit-button,
  .cancel-button {
    font-size: 12px;
    padding: 7px 10px;
  }
}
</style>
