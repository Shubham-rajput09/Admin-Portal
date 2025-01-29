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

  it('matches the initial snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('initial state of the form', () => {
    formFields.forEach((field) => {
      expect(wrapper.find(`[data-id="${field}"]`).exists()).toBe(true);
    });
  });

  it('matches snapshot after showing validation errors', async () => {
    await wrapper.find('[data-id="form"]').trigger('submit.prevent');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches snapshot after invalid email is entered', async () => {
    await wrapper.setData({
      formData: { ...wrapper.vm.formData, email: 'invalid-email' },
    });
    await wrapper.find('[data-id="form"]').trigger('submit.prevent');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches snapshot after invalid phone number is entered', async () => {
    await wrapper.setData({
      formData: { ...wrapper.vm.formData, phoneNumber: '12345' },
    });
    await wrapper.find('[data-id="form"]').trigger('submit.prevent');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches snapshot after successful form submission', async () => {
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
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('matches snapshot after form reset', async () => {
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
    expect(wrapper.html()).toMatchSnapshot();
  });
});
