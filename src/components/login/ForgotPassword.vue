<template>
  <div class="password-recovery-page" data-id="password-recovery-page">
    <div class="form-container" data-id="password-recovery-form">
      <h2>Password Recovery</h2>
      <p>
        Enter your email to receive an email with Password Reset instructions.
      </p>
      <form @submit.prevent="handlePasswordRecovery">
        <div class="input-group" data-id="email-group">
          <label for="email" data-id="email-label">Email</label>
          <Field
            id="email"
            type="email"
            v-model="values.email"
            placeholder="Enter your email"
            name="email"
            data-id="email-input"
          />
          <ErrorMessage
            name="email"
            class="error-message"
            data-id="email-error"
          />
        </div>

        <div class="captcha-group" data-id="captcha-group">
          <input
            type="checkbox"
            id="captcha"
            v-model="values.captchaChecked"
            data-id="captcha-checkbox"
          />
          <label for="captcha" data-id="captcha-label">I'm not a robot</label>
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
      <a href="#" class="forgot-email" data-id="forgot-email-link"
        >Forgot Email?</a
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ForgotPassword',
  components: {
    Field,
    ErrorMessage,
  },
  setup() {
    const router = useRouter();

    const schema = yup.object({
      email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required.')
        .trim(),
    });

    const { handleSubmit, values, errors } = useForm({
      validationSchema: schema,
      initialValues: {
        email: '',
        captchaChecked: false,
      },
    });

    const handlePasswordRecovery = handleSubmit(() => {
      console.log(`Password recovery initiated for email: ${values.email}`);
      if (values.captchaChecked) {
        console.log('Captcha checked: User verified they are not a robot.');
      } else {
        console.log(
          'Captcha not checked: Proceeding without user verification.',
        );
      }

      // Only proceed if email is valid and captcha is checked
      if (values.email && values.captchaChecked) {
        router.push('/');
      }
    });

    const goBack = () => {
      console.log('Going back to home page');
      router.push('/');
    };

    return {
      handlePasswordRecovery,
      goBack,
      values,
      errors,
    };
  },
});
</script>

<style scoped>
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
  max-width: 600px; /* Changed from 400px to 600px for more width */
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

input[type='email'] {
  /* Changed input type from 'text' to 'email' */
  width: 100%;
  padding: 6px;
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

.forgot-email {
  /* Changed class name from 'forgot-username' to 'forgot-email' */
  display: block;
  margin-top: 10px;
  font-size: 12px;
  color: #6c5ce7;
  text-decoration: none;
}

.forgot-email:hover {
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

  input[type='email'] {
    /* Adjusted the input field style here as well */
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

  input[type='email'] {
    /* Adjusted the input field style for smaller screens */
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
