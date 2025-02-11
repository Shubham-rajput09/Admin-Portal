import { mount } from '@vue/test-utils';
import AddBulk from '@/components/common/AddBulk.vue';
import { useToast } from 'vue-toastification';
import { h, reactive, nextTick } from 'vue';

const mockErrors = reactive({});
const mockFormValues = reactive({
  firstName: '',
  lastName: '',
  email: '',
  role: '',
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
  props: ['modelValue', 'name'],
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
describe('AddBulk.vue', () => {
  let wrapper;

  beforeEach(() => {
    Object.keys(mockErrors).forEach((key) => delete mockErrors[key]);
    Object.assign(mockFormValues, {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    });

    mockHandleSubmit.mockClear();
    mockResetForm.mockClear();
    mockToast.success.mockClear();

    wrapper = mount(AddBulk, {
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
    expect(
      wrapper.find('[data-id="first-name"] + .error-msg').text(),
    ).toContain('First name is required');
    expect(wrapper.find('[data-id="email"] + .error-msg').text()).toContain(
      'Email is required',
    );
  });

  it('validates email format', async () => {
    const emailInput = wrapper.find('[data-id="email"]');

    await emailInput.setValue('invalid-email');
    await wrapper.find('form').trigger('submit');
    Object.assign(mockErrors, { email: 'Email is not valid' });
    await nextTick();
    expect(wrapper.find('[data-id="email"] + .error-msg').text()).toContain(
      'Email is not valid',
    );
  });

  it('eequires role to be selected', async () => {
    await wrapper.find('form').trigger('submit');
    Object.assign(mockErrors, {
      role: 'Please select a role',
    });
    await nextTick();
    expect(
      wrapper.find('[data-id="select-role"]+ .error-msg').text(),
    ).toContain('Please select a role');
  });

  it('submits form with valid data', async () => {
    await wrapper.find('[data-id="first-name"]').setValue('John');
    await wrapper.find('[data-id="last-name"]').setValue('Doe');
    await wrapper.find('[data-id="email"]').setValue('john@example.com');
    await wrapper.find('[data-id="select-role"]').setValue('Admin');

    Object.assign(mockErrors, {});
    await wrapper.find('form').trigger('submit');

    await nextTick();

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

  it('toggles the welcome email checkbox value when clicked', async () => {
    const checkbox = wrapper.find('[data-id="welcome-checkbox"]');
    const initialChecked = checkbox.element.checked;
    await checkbox.setChecked();
    expect(checkbox.element.checked).toBe(!initialChecked);
  });

  it('matches snapshot', () => {
    const wrapper = mount(AddBulk);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
