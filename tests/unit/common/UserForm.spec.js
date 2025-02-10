// tests/unit/common/UserForm.spec.js
import { mount } from '@vue/test-utils';
import UserForm from '@/components/common/UserForm.vue';
import { useToast } from 'vue-toastification';
import { h, reactive, nextTick } from 'vue';

const mockErrors = reactive({});
const mockFormValues = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  confirmEmail: '',
  groups: '',
  userType: '',
  permissionFields: [],
  extensionOption: '',
});

const mockHandleSubmit = jest.fn((fn) => {
  return async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    await fn(mockFormValues);
  };
});
const mockResetForm = jest.fn();
const mockToast = { success: jest.fn() };

jest.mock('vue-toastification');
jest.mock('vee-validate', () => {
  const actual = jest.requireActual('vee-validate');
  return {
    ...actual,
    useForm: jest.fn(() => ({
      handleSubmit: mockHandleSubmit,
      resetForm: mockResetForm,
      errors: mockErrors,
      values: mockFormValues,
    })),
  };
});

useToast.mockReturnValue(mockToast);

const FieldStub = {
  name: 'Field',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      v-bind="$attrs" 
    />
  `,
};

const ErrorMessageStub = {
  name: 'ErrorMessage',
  props: ['name'],
  setup(props) {
    return () =>
      mockErrors[props.name]
        ? h('div', { class: 'error-msg' }, mockErrors[props.name])
        : null;
  },
};

describe('UserForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    Object.keys(mockErrors).forEach((key) => delete mockErrors[key]);
    Object.assign(mockFormValues, {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      confirmEmail: '',
      groups: '',
      userType: '',
      extensionOption: '',
    });

    mockHandleSubmit.mockClear();
    mockResetForm.mockClear();
    mockToast.success.mockClear();

    wrapper = mount(UserForm, {
      global: {
        stubs: {
          Field: FieldStub,
          ErrorMessage: ErrorMessageStub,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('shows validation errors when required fields are empty', async () => {
    await wrapper.find('form').trigger('submit');
    Object.assign(mockErrors, {
      firstName: 'First name is required',
      email: 'Email is required',
    });
    await nextTick();
    expect(wrapper.find('[data-id="firstName"] + .error-msg').text()).toContain(
      'First name is required',
    );
    expect(wrapper.find('[data-id="email"] + .error-msg').text()).toContain(
      'Email is required',
    );
  });

  it('validates email format and confirmation', async () => {
    const emailInput = wrapper.find('[data-id="email"]');
    const confirmEmailInput = wrapper.find('[data-id="confirmEmail"]');

    await emailInput.setValue('invalid-email');
    await confirmEmailInput.setValue('invalid-email');
    await wrapper.find('form').trigger('submit');
    Object.assign(mockErrors, { email: 'Email is not valid' });
    await nextTick();
    expect(wrapper.find('[data-id="email"] + .error-msg').text()).toContain(
      'Email is not valid',
    );

    await emailInput.setValue('valid@example.com');
    await confirmEmailInput.setValue('different@example.com');
    await wrapper.find('form').trigger('submit');
    Object.assign(mockErrors, { confirmEmail: 'Email must match' });
    await nextTick();
    expect(
      wrapper.find('[data-id="confirmEmail"] + .error-msg').text(),
    ).toContain('Email must match');
  });

  it('requires at least one permission to be selected', async () => {
    await wrapper.find('form').trigger('submit');
    Object.assign(mockErrors, {
      permissions: 'Please select at least one permission',
    });
    await nextTick();
    expect(wrapper.find('[data-id="error-permissions"]').text()).toContain(
      'Please select at least one permission',
    );
  });

  it('submits form with valid data', async () => {
    await wrapper.find('[data-id="firstName"]').setValue('John');
    await wrapper.find('[data-id="lastName"]').setValue('Doe');
    await wrapper.find('[data-id="username"]').setValue('johndoe');
    await wrapper.find('[data-id="email"]').setValue('john@example.com');
    await wrapper.find('[data-id="confirmEmail"]').setValue('john@example.com');
    await wrapper.find('[data-id="groups"]').setValue('group1');
    await wrapper.find('[data-id="userType"]').setValue('endUser');
    await wrapper.find('[data-id="permission-webAccess"]').setValue(true);
    await wrapper.find('[data-id="extension-assign"]').setValue(true);

    Object.assign(mockErrors, {});
    await wrapper.find('form').trigger('submit');

    expect(mockHandleSubmit).toHaveBeenCalled();
    expect(mockToast.success).toHaveBeenCalledWith(
      'Form submitted successfully!',
      {
        position: 'top-right',
        timeout: 3000,
      },
    );
    expect(mockResetForm).toHaveBeenCalled();
  });

  it('shows purchase notice when extension option is purchase', async () => {
    await wrapper.find('[data-id="extension-purchase"]').setValue(true);
    mockFormValues.extensionOption = 'purchase';
    await nextTick();
    expect(wrapper.find('[data-id="notice"]').exists()).toBe(true);
    expect(wrapper.find('[data-id="notice"]').text()).toMatch(
      'You will be brought to the store to purchase an extension after saving the user. Once you have purchased an extension, go to the Extensions page to assign the extension to this user.',
    );
  });
  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
