import { mount } from '@vue/test-utils';
import UserForm from '@/components/common/UserForm.vue';

describe('UserForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UserForm, {});
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('renders the form with all sections and inputs', () => {
    expect(wrapper.find('form').exists()).toBe(true);

    const basicInfoFields = wrapper.vm.basicInfoFields;
    basicInfoFields.forEach((field) => {
      expect(wrapper.find(`label[for="${field.id}"]`).exists()).toBe(true);
      expect(wrapper.find(`#${field.id}`).exists()).toBe(true);
    });
    expect(wrapper.find('[data-id="groups"]').exists()).toBe(true);
    expect(wrapper.find('[data-id="userType"]').exists()).toBe(true);
  });

  test('renders permissions checkboxes', () => {
    const permissionFields = wrapper.vm.permissionFields;

    Object.keys(permissionFields).forEach((key) => {
      const label = wrapper
        .findAll('label')
        .filter((node) => node.text().includes(permissionFields[key]))[0];

      expect(label.exists()).toBe(true);

      const checkbox = label.find(`[data-id="permission-${key}"]`);
      expect(checkbox.exists()).toBe(true);
    });
  });

  test('renders extension options correctly', () => {
    const extensionOptions = wrapper.vm.extensionOptions;

    Object.keys(extensionOptions).forEach((key) => {
      expect(wrapper.find(`[data-id="extension-${key}"]`).exists()).toBe(true);
    });
  });

  test('displays notice when extension option is "purchase"', async () => {
    await wrapper.setData({
      form: { ...wrapper.vm.form, extensionOption: 'purchase' },
    });
    const notice = wrapper.find('[data-id="notice"]');
    expect(notice.exists()).toBe(true);
    expect(notice.text()).toContain(
      'You will be brought to the store to purchase an extension',
    );
  });

  test('validates required fields', async () => {
    const formFields = [
      'firstName',
      'lastName',
      'username',
      'email',
      'confirmEmail',
    ];

    formFields.forEach((field) => {
      const input = wrapper.find(`#${field}`);
      expect(input.attributes('required')).toBeDefined();
    });
    const userType = wrapper.find('[data-id="userType"]');
    expect(userType.attributes('required')).toBeDefined();
  });

  test('handles form submission', async () => {
    const handleSubmitMock = jest.fn();
    wrapper.vm.handleSubmit = handleSubmitMock;

    await wrapper.find('form').trigger('submit.prevent');
    expect(handleSubmitMock).toHaveBeenCalled();
  });

  test('updates v-model when input changes', async () => {
    const input = wrapper.find('[data-id="firstName"]');
    await input.setValue('John');
    expect(wrapper.vm.form.firstName).toBe('John');
  });

  test('updates selected group in form data', async () => {
    const select = wrapper.find('[data-id="groups"]');
    await select.setValue('group2');
    expect(wrapper.vm.form.groups).toBe('group2');
  });

  test('updates user type in form data', async () => {
    const select = wrapper.find('[data-id="userType"]');
    await select.setValue('billingAdmin');
    expect(wrapper.vm.form.userType).toBe('billingAdmin');
  });

  test('matches snapshot', () => {
    const wrapper = mount(UserForm);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
