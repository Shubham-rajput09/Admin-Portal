import { mount } from '@vue/test-utils';
import DropDownComponent from '@/components/common/DropdownComponent.vue';

describe('DropdownComponent.vue', () => {
  const dropDownTitle = 'AddBulk';
  const dropDownList = [{ key: 'add', label: 'Add' }];

  let wrapper;

  beforeEach(() => {
    wrapper = mount(DropDownComponent, {
      props: { dropDownTitle, dropDownList },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the dropdown button with the correct title', () => {
    const button = wrapper.find('[data-id="dropdown-button"]');
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain(dropDownTitle);
  });

  it('toggles dropdown visibility when button is clicked', async () => {
    expect(wrapper.vm.isOpen).toBe(false);
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.find('[data-id="dropdown-menu"]').exists()).toBe(true);

    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('renders the correct number of dropdown items', async () => {
    await wrapper.setData({ isOpen: true });
    const items = wrapper.findAll('[data-id^="dropdown-item-"]');
    expect(items.length).toBe(dropDownList.length);
    expect(items[0].text()).toBe(dropDownList[0].label);
  });

  it('emits the correct event when an item is clicked', async () => {
    await wrapper.setData({ isOpen: true });
    const item = wrapper.find('[data-id^="dropdown-item-"]');
    await item.trigger('click');

    expect(wrapper.emitted('select-option')).toBeTruthy();
    expect(wrapper.emitted('select-option')[0]).toEqual([dropDownList[0].key]);
  });

  it('closes the dropdown when clicking outside', async () => {
    await wrapper.find('[data-id="dropdown-button"]').trigger('click');
    expect(wrapper.vm.isOpen).toBe(true);

    document.dispatchEvent(new Event('click'));
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('accepts props and passes them correctly', () => {
    const wrapper = mount(DropDownComponent, {
      props: { dropDownTitle: dropDownTitle, dropDownList: dropDownList },
    });

    expect(wrapper.props('dropDownTitle')).toBe(dropDownTitle);
    expect(wrapper.props('dropDownList')).toStrictEqual(dropDownList);
  });

  it('matches snapshot', () => {
    const wrapper = mount(DropDownComponent, {
      propsData: { dropDownTitle: 'Snapshot Test', dropDownList: dropDownList },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
