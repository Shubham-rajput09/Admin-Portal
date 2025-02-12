<template>
  <div class="background-container" data-id="background-container">
    <div class="cancel-button">
      <CancelButton buttonName="Cancel" @click="goBack" />
    </div>
    <!-- Form Section -->
    <div class="form-section" v-if="!showThankYou" data-id="form-section">
      <form @submit="onSubmit" novalidate data-id="form">
        <!-- First Name and Last Name -->
        <div class="input-row" data-id="name-input-row">
          <div class="input-group" data-id="first-name-group">
            <label for="firstName">First Name</label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              aria-label="First Name"
              data-id="first-name-input"
            />
            <ErrorMessage name="firstName" class="error-message" />
          </div>
          <div class="input-group" data-id="last-name-group">
            <label for="lastName">Last Name</label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              aria-label="Last Name"
              data-id="last-name-input"
            />
            <ErrorMessage name="lastName" class="error-message" />
          </div>
        </div>

        <!-- Company Name and Employees -->
        <div class="input-row" data-id="company-input-row">
          <div class="input-group" data-id="company-name-group">
            <label for="companyName">Company Name</label>
            <Field
              id="companyName"
              name="companyName"
              type="text"
              placeholder="Company Name"
              aria-label="Company Name"
              data-id="company-name-input"
            />
            <ErrorMessage name="companyName" class="error-message" />
          </div>
          <div class="input-group" data-id="employees-group">
            <label for="employees">Employees (optional)</label>
            <Field
              as="select"
              name="employees"
              id="employees"
              aria-label="Employees"
              data-id="employees-select"
            >
              <option value="" disabled>Select</option>
              <option
                v-for="(option, index) in employeeOptions"
                :key="index"
                :value="option"
                :data-id="`employee-option-${index}`"
              >
                {{ option }}
              </option>
            </Field>
          </div>
        </div>

        <!-- Email and Phone Number -->
        <div class="input-row" data-id="contact-input-row">
          <div class="input-group" data-id="email-group">
            <label for="email">Email</label>
            <Field
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              aria-label="Email"
              data-id="email-input"
            />
            <ErrorMessage name="email" class="error-message" />
          </div>
          <div class="input-group" data-id="phone-number-group">
            <label for="phoneNumber">Phone Number</label>
            <div class="phone-input" data-id="phone-input">
              <Field
                id="dialingCode"
                as="select"
                name="dialingCode"
                aria-label="Dialing Code"
                required
                data-id="dialing-code-select"
              >
                <option selected disabled value=""></option>
                <option
                  v-for="(country, index) in countryData"
                  :key="index"
                  :value="country.value"
                  :data-country-code="country.code"
                  :data-country-name="country.name"
                  :data-id="`dialing-code-option-${index}`"
                >
                  {{ country.name }} ({{ country.value }})
                </option>
              </Field>
              <Field
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
                placeholder="Phone Number"
                aria-label="Phone Number"
                data-id="phone-number-input"
              />
            </div>
            <ErrorMessage name="phoneNumber" class="error-message" />
          </div>
        </div>

        <!-- Interest and Country/Region -->
        <div class="input-row" data-id="interest-country-row">
          <div class="input-group" data-id="interest-group">
            <label for="interest">What are you interested in?</label>
            <Field
              as="select"
              name="interest"
              id="interest"
              required
              aria-label="Interest"
              data-id="interest-select"
            >
              <option value="" disabled>Select</option>
              <option
                v-for="(interest, index) in interestOptions"
                :key="index"
                :value="interest"
                :data-id="`interest-option-${index}`"
              >
                {{ interest }}
              </option>
            </Field>
            <ErrorMessage name="interest" class="error-message" />
          </div>
          <div class="input-group" data-id="country-group">
            <label for="country">Country/Region</label>
            <Field
              as="select"
              name="country"
              id="country"
              required
              aria-label="Country"
              data-id="country-select"
            >
              <option value="" disabled>Select</option>
              <option
                v-for="(country, index) in countryOptions"
                :key="index"
                :value="country"
                :data-id="`country-option-${index}`"
              >
                {{ country }}
              </option>
            </Field>
            <ErrorMessage name="country" class="error-message" />
          </div>
        </div>

        <!-- Consent Checkbox -->
        <div class="checkbox-group" data-id="consent-group">
          <Field
            name="consent"
            id="consent"
            type="checkbox"
            :value="true"
            v-model="form.consent"
            aria-label="Consent Checkbox"
            data-id="consent-checkbox"
          />
          <label for="consent" data-id="consent-label">
            By checking this box, you agree to be contacted via phone and email
            regarding your interest in our products and services. We will treat
            your data in accordance with our
            <a
              href="/privacy-policy"
              target="_blank"
              data-id="privacy-policy-link"
              >privacy policy</a
            >.
          </label>
          <ErrorMessage name="consent" class="error-message" />
        </div>

        <!-- Submit Button -->
        <button data-id="submit-button" type="submit" class="submit-button">
          Submit
        </button>
      </form>
    </div>

    <!-- Thank You Section -->
    <div
      class="thank-you-section"
      v-if="showThankYou"
      data-id="thank-you-section"
    >
      <h2 data-id="thank-you-message">Thanks for Reaching Out!</h2>
      <p data-id="thank-you-description">
        We'll get back to you as soon as we can. In the meantime, feel free to
        explore more about Vonage and how we're making communications more
        flexible, intelligent, and personal so our customers can stay.
      </p>
      <button
        class="go-back-button"
        @click="resetForm"
        data-id="go-back-button"
      >
        Go Back
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Field, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useToast } from 'vue-toastification';
import CancelButton from '@/components/common/CancelButton.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ContactUs',
  components: { Field, ErrorMessage, CancelButton },
  methods: {
    handleEvent(event) {
      if (event.key == 'Escape') {
        this.$router.back();
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.handleEvent);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.handleEvent);
  },
  setup() {
    const toast = useToast();
    const schema = yup.object({
      firstName: yup
        .string()
        .required('First name is required')
        .matches(/^[A-Za-z]+$/, 'First name must contain only letters'),
      lastName: yup
        .string()
        .required('Last name is required')
        .matches(/^[A-Za-z]+$/, 'Last name must contain only letters'),
      email: yup
        .string()
        .required('Email is required')
        .email('Email is not valid'),
      companyName: yup.string().required('Please Enter a company name'),
      phoneNumber: yup
        .string()
        .required('Please enter a phone number')
        .matches(/^[0-9]*$/, 'Enter a valid phone number')
        .min(10),
      interest: yup.string().required('Please select a interest'),
      country: yup.string().required('Please select a contry'),
      consent: yup
        .boolean()
        .required('You must accept the privacy policy')
        .oneOf([true], 'You must accept the privacy policy'),
    });
    const {
      handleSubmit,
      values: form,
      resetForm,
    } = useForm({
      validationSchema: schema,
      initialValues: {
        firstName: '',
        lastName: '',
        companyName: '',
        employees: '',
        email: '',
        phoneNumber: '',
        dialingCode: '',
        interest: '',
        country: '',
        consent: false,
      },
    });
    const router = useRouter();
    const goBack = () => {
      router.back();
    };
    const onSubmit = handleSubmit((values) => {
      console.log(values);
      toast.success('Form submitted successfully!', {
        position: 'top-right',
        timeout: 3000,
      });
      resetForm();
    });

    return {
      onSubmit,
      form,
      goBack,
      basicInfoFields: [
        {
          id: 'firstName',
          model: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'Enter first name',
          required: true,
        },
        {
          id: 'lastName',
          model: 'lastName',
          type: 'text',
          label: 'Last Name',
          placeholder: 'Enter last name',
          required: true,
        },
      ],
      errors: {},
      employeeOptions: ['1-10', '11-50', '51-200', '201-500', '500+'],
      countryData: [
        { code: 'AF', name: 'Afghanistan', value: '+93' },
        { code: 'AL', name: 'Albania', value: '+355' },
        { code: 'DZ', name: 'Algeria', value: '+213' },
        { code: 'AS', name: 'American Samoa', value: '+1-684' },
        { code: 'AD', name: 'Andorra', value: '+376' },
        { code: 'AO', name: 'Angola', value: '+244' },
        { code: 'AI', name: 'Anguilla', value: '+1-264' },
        { code: 'AG', name: 'Antigua and Barbuda', value: '+1-268' },
        { code: 'AR', name: 'Argentina', value: '+54' },
        { code: 'AM', name: 'Armenia', value: '+374' },
        { code: 'AU', name: 'Australia', value: '+61' },
        { code: 'AT', name: 'Austria', value: '+43' },
        { code: 'AZ', name: 'Azerbaijan', value: '+994' },
        { code: 'BS', name: 'Bahamas', value: '+1-242' },
        { code: 'BH', name: 'Bahrain', value: '+973' },
        { code: 'BD', name: 'Bangladesh', value: '+880' },
        { code: 'BB', name: 'Barbados', value: '+1-246' },
        { code: 'BY', name: 'Belarus', value: '+375' },
        { code: 'BE', name: 'Belgium', value: '+32' },
        { code: 'BZ', name: 'Belize', value: '+501' },
        { code: 'BJ', name: 'Benin', value: '+229' },
        { code: 'BM', name: 'Bermuda', value: '+1-441' },
        { code: 'BT', name: 'Bhutan', value: '+975' },
        { code: 'BO', name: 'Bolivia', value: '+591' },
        { code: 'BA', name: 'Bosnia and Herzegovina', value: '+387' },
        { code: 'BW', name: 'Botswana', value: '+267' },
        { code: 'BR', name: 'Brazil', value: '+55' },
        { code: 'BN', name: 'Brunei', value: '+673' },
        { code: 'BG', name: 'Bulgaria', value: '+359' },
        { code: 'BF', name: 'Burkina Faso', value: '+226' },
        { code: 'BI', name: 'Burundi', value: '+257' },
        { code: 'KH', name: 'Cambodia', value: '+855' },
        { code: 'CM', name: 'Cameroon', value: '+237' },
        { code: 'CA', name: 'Canada', value: '+1' },
        { code: 'CV', name: 'Cape Verde', value: '+238' },
        { code: 'KY', name: 'Cayman Islands', value: '+1-345' },
        { code: 'CF', name: 'Central African Republic', value: '+236' },
        { code: 'TD', name: 'Chad', value: '+235' },
        { code: 'CL', name: 'Chile', value: '+56' },
        { code: 'CN', name: 'China', value: '+86' },
        { code: 'CO', name: 'Colombia', value: '+57' },
        { code: 'KM', name: 'Comoros', value: '+269' },
        { code: 'CG', name: 'Congo', value: '+242' },
        { code: 'CD', name: 'Congo (DRC)', value: '+243' },
        { code: 'CR', name: 'Costa Rica', value: '+506' },
        { code: 'HR', name: 'Croatia', value: '+385' },
        { code: 'CU', name: 'Cuba', value: '+53' },
        { code: 'CY', name: 'Cyprus', value: '+357' },
        { code: 'CZ', name: 'Czech Republic', value: '+420' },
        { code: 'DK', name: 'Denmark', value: '+45' },
        { code: 'DJ', name: 'Djibouti', value: '+253' },
        { code: 'DM', name: 'Dominica', value: '+1-767' },
        { code: 'DO', name: 'Dominican Republic', value: '+1-809' },
        { code: 'EC', name: 'Ecuador', value: '+593' },
        { code: 'EG', name: 'Egypt', value: '+20' },
        { code: 'SV', name: 'El Salvador', value: '+503' },
        { code: 'GQ', name: 'Equatorial Guinea', value: '+240' },
        { code: 'ER', name: 'Eritrea', value: '+291' },
        { code: 'EE', name: 'Estonia', value: '+372' },
        { code: 'SZ', name: 'Eswatini', value: '+268' },
        { code: 'ET', name: 'Ethiopia', value: '+251' },
        { code: 'FJ', name: 'Fiji', value: '+679' },
        { code: 'FI', name: 'Finland', value: '+358' },
        { code: 'FR', name: 'France', value: '+33' },
        { code: 'GA', name: 'Gabon', value: '+241' },
        { code: 'GM', name: 'Gambia', value: '+220' },
        { code: 'GE', name: 'Georgia', value: '+995' },
        { code: 'DE', name: 'Germany', value: '+49' },
        { code: 'GH', name: 'Ghana', value: '+233' },
        { code: 'GR', name: 'Greece', value: '+30' },
        { code: 'GD', name: 'Grenada', value: '+1-473' },
        { code: 'GT', name: 'Guatemala', value: '+502' },
        { code: 'GN', name: 'Guinea', value: '+224' },
        { code: 'GW', name: 'Guinea-Bissau', value: '+245' },
        { code: 'GY', name: 'Guyana', value: '+592' },
        { code: 'HT', name: 'Haiti', value: '+509' },
        { code: 'HN', name: 'Honduras', value: '+504' },
        { code: 'HK', name: 'Hong Kong', value: '+852' },
        { code: 'HU', name: 'Hungary', value: '+36' },
        { code: 'IS', name: 'Iceland', value: '+354' },
        { code: 'IN', name: 'India', value: '+91' },
        { code: 'ID', name: 'Indonesia', value: '+62' },
        { code: 'IR', name: 'Iran', value: '+98' },
        { code: 'IQ', name: 'Iraq', value: '+964' },
        { code: 'IE', name: 'Ireland', value: '+353' },
        { code: 'IL', name: 'Israel', value: '+972' },
        { code: 'IT', name: 'Italy', value: '+39' },
        { code: 'JM', name: 'Jamaica', value: '+1-876' },
        { code: 'JP', name: 'Japan', value: '+81' },
        { code: 'JO', name: 'Jordan', value: '+962' },
        { code: 'KZ', name: 'Kazakhstan', value: '+7' },
        { code: 'KE', name: 'Kenya', value: '+254' },
        { code: 'KI', name: 'Kiribati', value: '+686' },
        { code: 'KP', name: 'North Korea', value: '+850' },
        { code: 'KR', name: 'South Korea', value: '+82' },
        { code: 'KW', name: 'Kuwait', value: '+965' },
        { code: 'KG', name: 'Kyrgyzstan', value: '+996' },
        { code: 'LA', name: 'Laos', value: '+856' },
        { code: 'LV', name: 'Latvia', value: '+371' },
        { code: 'LB', name: 'Lebanon', value: '+961' },
        { code: 'LS', name: 'Lesotho', value: '+266' },
        { code: 'LR', name: 'Liberia', value: '+231' },
        { code: 'LY', name: 'Libya', value: '+218' },
        { code: 'LI', name: 'Liechtenstein', value: '+423' },
        { code: 'LT', name: 'Lithuania', value: '+370' },
        { code: 'LU', name: 'Luxembourg', value: '+352' },
        { code: 'MO', name: 'Macau', value: '+853' },
        { code: 'MK', name: 'North Macedonia', value: '+389' },
      ],
      interestOptions: ['Product', 'Service', 'Other'],
      countryOptions: [
        'Argentina',
        'Australia',
        'Austria',
        'Bangladesh',
        'Belgium',
        'Bhutan',
        'Brazil',
        'Canada',
        'China',
        'Czech Republic',
        'Denmark',
        'Egypt',
        'Finland',
        'France',
        'Germany',
        'Greece',
        'Hungary',
        'India',
        'Indonesia',
        'Ireland',
        'Israel',
        'Italy',
        'Japan',
        'Kazakhstan',
        'Kenya',
        'Malaysia',
        'Maldives',
        'Mexico',
        'Nepal',
        'Netherlands',
        'New Zealand',
        'Nigeria',
        'Norway',
        'Pakistan',
        'Philippines',
        'Poland',
        'Portugal',
        'Russia',
        'Saudi Arabia',
        'Scotland',
        'Singapore',
        'South Africa',
        'South Korea',
        'Spain',
        'Sri Lanka',
        'Sweden',
        'Switzerland',
        'Thailand',
        'Turkey',
        'UAE',
        'UK',
        'Ukraine',
        'USA',
        'Uzbekistan',
        'Vietnam',
        'Wales',
      ],
      showThankYou: false,
    };
  },
});
</script>

<style scoped>
/* Style for the background container */
.cancel-button {
  position: absolute;
  top: 15px;
  right: 15px;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

/* Add the same styles as earlier and style the thank-you message */
.thank-you-section {
  text-align: center;
  margin-top: 20px;
}

h2 {
  color: #007bff;
  margin-bottom: 10px;
}

p {
  margin-bottom: 20px;
  font-size: 16px;
}

.go-back-button {
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.go-back-button:hover {
  background: #333;
}
.background-container {
  background: url('@/assets/rpg.png') no-repeat center center;
  background-size: cover;
  min-height: 100vh; /* Ensures it takes the full height of the viewport */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px; /* Centers the form inside the container */
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
  padding: 5px;
  font-size: 20px;
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
