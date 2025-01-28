import { mount } from '@vue/test-utils';
import CheckBoxDropDown from '@/components/common/CheckBoxDropDown.vue';

describe('CheckboxDropdown.vue', () => {
  let wrapper;
  const title = 'Select Options';
  const options = [
    { key: 'user', label: 'User' },
    { key: 'extension', label: 'Extension' },
    { key: 'phone number', label: 'Phone Number' },
  ];

  beforeEach(() => {
    wrapper = mount(CheckBoxDropDown, {
      props: {
        checkBoxDropDownTitle: title,
        dropDownList: options,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the dropdown with the correct title', () => {
    expect(wrapper.find('[data-id="dropdown-button"]').text()).toContain(title);
  });

  it('toggles the dropdown menu visibility when button is clicked', async () => {
    expect(wrapper.find('[data-id="dropdown-menu"]').exists()).toBe(false);
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    expect(wrapper.find('[data-id="dropdown-menu"]').exists()).toBe(true);
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    expect(wrapper.find('[data-id="dropdown-menu"]').exists()).toBe(false);
  });

  it('renders the correct number of checkboxes for options', async () => {
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    expect(checkboxes.length).toBe(options.length + 1); //+1 for select all
  });

  it('updates selectedOptions when individual checkboxes are checked', async () => {
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    const firstCheckbox = wrapper.find('[data-id="option-0"]');
    await firstCheckbox.setChecked();
    expect(wrapper.vm.selectedOptions).toContain('user');
  });

  it('checks "Select All" checkbox when all options are selected', async () => {
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    const checkboxes = wrapper.findAll('input[type="checkbox"]');
    await checkboxes[1].setChecked();
    await checkboxes[2].setChecked();
    await checkboxes[3].setChecked();
    expect(wrapper.vm.isSelectAllChecked).toBe(true);
    expect(checkboxes[0].element.checked).toBe(true);
  });

  it('toggles all checkboxes when "Select All" is clicked', async () => {
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    const selectAllCheckbox = wrapper.find('[data-id="select-all"]');
    await selectAllCheckbox.setChecked();
    expect(wrapper.vm.selectedOptions).toEqual(options.map((opt) => opt.key));
    await selectAllCheckbox.setChecked(false);
    expect(wrapper.vm.selectedOptions).toEqual([]);
  });

  it('emits "update-selected" event with selected options', async () => {
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    const selectAllCheckbox = wrapper.find('[data-id="select-all"]');
    await selectAllCheckbox.setChecked();
    expect(wrapper.emitted('update-selected')).toBeTruthy();
    expect(wrapper.emitted('update-selected')[0][0]).toEqual(
      options.map((opt) => opt.key),
    );
  });

  it('closes the dropdown when clicking outside', async () => {
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);
    document.dispatchEvent(new Event('click'));
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('accepts props and passes them correctly', () => {
    const wrapper = mount(CheckBoxDropDown, {
      props: { checkBoxDropDownTitle: title, dropDownList: options },
    });

    expect(wrapper.props('checkBoxDropDownTitle')).toBe(title);
    expect(wrapper.props('dropDownList')).toStrictEqual(options);
  });

  it('matches snapshot', () => {
    const wrapper = mount(CheckBoxDropDown, {
      propsData: {
        checkBoxDropDownTitle: 'Snapshot Test',
        dropDownList: options,
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
