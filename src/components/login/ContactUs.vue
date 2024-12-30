<template>
  <!-- Parent container with the background image -->
  <div class="background-container">
    <!-- Form section inside the background container -->
    <div class="form-section">
      <form @submit.prevent="handleSubmit">
        <!-- First Name and Last Name -->
        <div class="input-row">
          <div class="input-group">
            <label for="firstName">First Name</label>
            <input
                id="firstName"
                type="text"
                v-model="formData.firstName"
                required
                placeholder="First Name"
                aria-label="First Name"
            />
          </div>
          <div class="input-group">
            <label for="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                v-model="formData.lastName"
                required
                placeholder="Last Name"
                aria-label="Last Name"
            />
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
                required
                placeholder="Company Name"
                aria-label="Company Name"
            />
          </div>
          <div class="input-group">
            <label for="employees">Employees (optional)</label>
            <select id="employees" v-model="formData.employees" aria-label="Employees">
              <option value="" disabled>Select</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="500+">500+</option>
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
                required
                placeholder="Email"
                aria-label="Email"
            />
          </div>
          <div class="input-group">
            <label for="phoneNumber">Phone Number</label>
            <div class="phone-input">
              <select v-model="formData.countryCode" aria-label="Country Code">
                <option value="+1">+1</option>
                <option value="+91">+91</option>
              </select>
              <input
                  id="phoneNumber"
                  type="tel"
                  v-model="formData.phoneNumber"
                  required
                  placeholder="Phone Number"
                  aria-label="Phone Number"
              />
            </div>
          </div>
        </div>

        <!-- Interest and Country/Region -->
        <div class="input-row">
          <div class="input-group">
            <label for="interest">What are you interested in?</label>
            <select id="interest" v-model="formData.interest" required aria-label="Interest">
              <option value="" disabled>Select</option>
              <option value="product">Product</option>
              <option value="service">Service</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="input-group">
            <label for="country">Country/Region</label>
            <select id="country" v-model="formData.country" required aria-label="Country">
              <option value="India">India</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
        </div>

        <!-- Consent Checkbox -->
        <div class="checkbox-group">
          <input
              id="consent"
              type="checkbox"
              v-model="formData.consent"
              required
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
        country: "USA",
        consent: false,
      },
    };
  },
  methods: {
    handleSubmit() {
      alert("Form submitted successfully!");
      console.log(this.formData);
    },
  },
};
</script>

<style scoped>
/* Style for the background container */
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
