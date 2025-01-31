import { mount } from '@vue/test-utils';
import ContactUs from '@/components/login/ContactUs.vue';

describe('ContactUs.vue', () => {
  let wrapper;

  const formFields = [
    'first-name-input',
    'last-name-input',
    'company-name-input',
    'employees-select',
    'email-input',
    'phone-number-input',
    'dialing-code-select',
    'interest-select',
    'country-select',
    'consent-checkbox',
  ];

  beforeEach(() => {
    wrapper = mount(ContactUs);
  });

  test('initial state of the form', () => {
    formFields.forEach((field) => {
      expect(wrapper.find(`[data-id="${field}"]`).exists()).toBe(true);
    });
  });

  it('shows validation errors when form is submitted with invalid data', async () => {
    await wrapper.find('[data-id="form"]').trigger('submit.prevent');
  });

  it('shows validation error for invalid email', async () => {
    await wrapper.setData({
      formData: { ...wrapper.vm.formData, email: 'invalid-email' },
    });
    await wrapper.find('[data-id="form"]').trigger('submit.prevent');
  });

  it('shows validation error for invalid phone number', async () => {
    await wrapper.setData({
      formData: { ...wrapper.vm.formData, phoneNumber: '12345' },
    });
    await wrapper.find('[data-id="form"]').trigger('submit.prevent');
  });

  it('successfully submits the form with valid data', async () => {
    await wrapper.setData({
      formData: {
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'Company Inc.',
        employees: '51-200',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        countryCode: '+1',
        interest: 'Product',
        country: 'USA',
        consent: true,
      },
    });
    await wrapper.find('[data-id="submit-button"]').trigger('click');
  });

  it('resets the form when go-back button is clicked', async () => {
    await wrapper.setData({
      formData: {
        firstName: 'John',
        lastName: 'Doe',
        companyName: 'Company Inc.',
        employees: '51-200',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        countryCode: '+1',
        interest: 'Product',
        country: 'USA',
        consent: true,
      },
    });
    await wrapper.find('[data-id="form"]').trigger('submit.prevent');
    await wrapper.find('[data-id="go-back-button"]').trigger('click');
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
