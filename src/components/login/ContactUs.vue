<template>
  <div class="background-container">
    <div class="form-section">
      <form @submit.prevent="handleSubmit" novalidate>
        <!-- First Name and Last Name -->
        <div class="input-row">
          <div class="input-group">
            <label for="firstName">First Name</label>
            <input
                id="firstName"
                type="text"
                v-model="formData.firstName"
                placeholder="First Name"
                aria-label="First Name"
                @blur="validateField('firstName')"
            />
            <p v-if="errors.firstName" class="error-message">{{ errors.firstName }}</p>
          </div>
          <div class="input-group">
            <label for="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                v-model="formData.lastName"
                placeholder="Last Name"
                aria-label="Last Name"
                @blur="validateField('lastName')"
            />
            <p v-if="errors.lastName" class="error-message">{{ errors.lastName }}</p>
          </div>
        </div>

        <!-- Company Name and Employees -->
        <div class="input-row">
          <div class="input-group">
            <label for="companyName">Company Name</label>
            <input
                id="companyName"
                type="text"
                v-model="formData.companyName"
                placeholder="Company Name"
                aria-label="Company Name"
                @blur="validateField('companyName')"
            />
            <p v-if="errors.companyName" class="error-message">{{ errors.companyName }}</p>
          </div>
          <div class="input-group">
            <label for="employees">Employees (optional)</label>
            <select id="employees" v-model="formData.employees" aria-label="Employees">
              <option value="" disabled>Select</option>
              <option v-for="(option, index) in employeeOptions" :key="index" :value="option">{{ option }}</option>
            </select>
          </div>
        </div>

        <!-- Email and Phone Number -->
        <div class="input-row">
          <div class="input-group">
            <label for="email">Email</label>
            <input
                id="email"
                type="email"
                v-model="formData.email"
                placeholder="Email"
                aria-label="Email"
                @blur="validateField('email')"
            />
            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
          </div>
          <div class="input-group">
            <label for="phoneNumber">Phone Number</label>
            <div class="phone-input">
              <select v-model="formData.countryCode" aria-label="Country Code">
                <option value="" disabled>Select Code</option>
                <option v-for="(code, index) in countryCodes" :key="index" :value="code">{{ code }}</option>
              </select>
              <input
                  id="phoneNumber"
                  type="tel"
                  v-model="formData.phoneNumber"
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  @blur="validateField('phoneNumber')"
              />
            </div>
            <p v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</p>
          </div>
        </div>

        <!-- Interest and Country/Region -->
        <div class="input-row">
          <div class="input-group">
            <label for="interest">What are you interested in?</label>
            <select id="interest" v-model="formData.interest" required aria-label="Interest" @blur="validateField('interest')">
              <option value="" disabled>Select</option>
              <option v-for="(interest, index) in interestOptions" :key="index" :value="interest">{{ interest }}</option>
            </select>
            <p v-if="errors.interest" class="error-message">{{ errors.interest }}</p>
          </div>
          <div class="input-group">
            <label for="country">Country/Region</label>
            <select id="country" v-model="formData.country" required aria-label="Country" @blur="validateField('country')">
              <option value="" disabled>Select</option>
              <option v-for="(country, index) in countryOptions" :key="index" :value="country">{{ country }}</option>
            </select>
            <p v-if="errors.country" class="error-message">{{ errors.country }}</p>
          </div>
        </div>

        <!-- Consent Checkbox -->
        <div class="checkbox-group">
          <input
              id="consent"
              type="checkbox"
              v-model="formData.consent"
              aria-label="Consent Checkbox"
          />
          <label for="consent">
            By checking this box, you agree to be contacted via phone and email
            regarding your interest in our products and services. We will treat your data in
            accordance with our <a href="/privacy-policy" target="_blank">privacy policy</a>.
          </label>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        companyName: "",
        employees: "",
        email: "",
        phoneNumber: "",
        countryCode: "+1",
        interest: "",
        country: "",
        consent: false, // Checkbox is optional
      },
      errors: {},
      employeeOptions: ["1-10", "11-50", "51-200", "201-500", "500+"],
      countryCodes: ["+1", "+91", "+44", "+61"],
      interestOptions: ["Product", "Service", "Other"],
      countryOptions: ["India", "USA", "UK", "Canada"],
    };
  },
  methods: {
    validateField(field) {
      if (!this.formData[field]) {
        this.errors[field] = "This field is required.";
      } else {
        delete this.errors[field];
      }

      // Additional email validation
      if (field === "email" && this.formData.email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(this.formData.email)) {
          this.errors.email = "Please enter a valid email address.";
        }
      }

      // Additional phone number validation
      if (field === "phoneNumber" && this.formData.phoneNumber) {
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(this.formData.phoneNumber)) {
          this.errors.phoneNumber = "Please enter a valid phone number.";
        }
      }
    },
    handleSubmit() {
      // Reset errors
      this.errors = {};

      // Define the order of fields to validate
      const fieldsOrder = [
        "firstName",
        "lastName",
        "companyName",
        "employees",
        "email",
        "phoneNumber",
        "interest",
        "country",
      ];

      // Validate fields in order and stop at the first error
      for (const field of fieldsOrder) {
        this.validateField(field);
        if (this.errors[field]) {
          // Stop validation at the first error
          break;
        }
      }

      // If there are no errors, proceed with form submission
      if (Object.keys(this.errors).length === 0) {
        console.log("Form submitted successfully:", this.formData);
      }
    },
  },
};
</script>

<style scoped>
/* Style for the background container */

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}
.background-container {
  background: url('@/assets/rpg.png') no-repeat center center;
  background-size: cover;
  min-height: 100vh; /* Ensures it takes the full height of the viewport */
  display: flex;
  align-items: center;
  justify-content: center; /* Centers the form inside the container */
}

/* Form section styling */
.form-section {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 50px auto; /* Adds spacing at the top */
}

/* Layout for input rows */
.input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
}

.input-group {
  flex: 1;
  min-width: 250px;
}

/* Styling for labels */
label {
  font-size: 14px;
  margin-bottom: 5px;
  display: block;
}

/* Styling for inputs and selects */
input,
select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input:focus,
select:focus {
  border-color: #007bff;
  outline: none;
}

/* Styling for phone input */
.phone-input {
  display: flex;
  gap: 5px;
}

/* Styling for consent checkbox */
.checkbox-group {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
}

.checkbox-group a {
  color: #007bff;
  text-decoration: none;
}

/* Submit button styling */
.submit-button {
  background: #000;
  color: #fff;
  border: none;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: #333;
}

/* Responsive layout */
@media (max-width: 768px) {
  .input-row {
    flex-direction: column;
  }
}
</style>
