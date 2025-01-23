import { mount } from '@vue/test-utils';
import AddBulk from '@/components/common/AddBulk.vue';

describe('AddBulk.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(AddBulk);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the AddBulk component correctly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('disables the "Add User" button initially', () => {
    const button = wrapper.find('[data-id="add-user-btn"]');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('enables the "Add User" button when all fields are filled', async () => {
    const firstNameInput = wrapper.find('[data-id="first-name"]');
    const lastNameInput = wrapper.find('[data-id="last-name"]');
    const emailInput = wrapper.find('[data-id="email"]');
    const roleSelect = wrapper.find('[data-id="select-role"');
    const button = wrapper.find('[data-id="add-user-btn"]');

    await firstNameInput.setValue('John');
    await lastNameInput.setValue('Doe');
    await emailInput.setValue('john.doe@example.com');
    await roleSelect.setValue('user');

    expect(button.attributes('disabled')).toBeFalsy();
  });

  it('toggles the welcome email checkbox value when clicked', async () => {
    const checkbox = wrapper.find('[data-id="welcome-checkbox"]');
    const initialChecked = checkbox.element.checked;
    await checkbox.setChecked();
    expect(checkbox.element.checked).toBe(!initialChecked);
  });

  it('displays the empty state message when no users are added', () => {
    const emptyStateText = wrapper.find('[data-id="no-user-added"] p').text();
    expect(emptyStateText).toBe('You have not yet added any users');
  });

  it('matches snapshot', () => {
    const wrapper = mount(AddBulk);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
