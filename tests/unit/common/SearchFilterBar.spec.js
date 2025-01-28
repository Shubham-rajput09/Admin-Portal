import { shallowMount, mount } from '@vue/test-utils';
import SearchFilterBar from '@/components/common/SearchFilterBar.vue';
import PrimaryButton from '@/components/common/PrimaryButton.vue';
import DropdownComponent from '@/components/common/DropdownComponent.vue';
import CheckBoxDropDown from '@/components/common/CheckBoxDropDown.vue';

describe('SearchFilterBar.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SearchFilterBar, {
      stubs: {
        PrimaryButton,
        DropdownComponent,
        CheckBoxDropDown,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the SearchBar component correctly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.search-bar').exists()).toBe(true);
  });

  it('toggles the search input visibility on button click', async () => {
    const searchButton = wrapper.find('.search-button');
    const searchInput = wrapper.find('.search-input');

    expect(wrapper.vm.isSearchInputVisible).toBe(false);
    expect(searchInput.isVisible()).toBe(false);

    await searchButton.trigger('click');
    expect(wrapper.vm.isSearchInputVisible).toBe(true);
    expect(searchInput.isVisible()).toBe(true);

    await searchInput.trigger('blur');
    expect(wrapper.vm.isSearchInputVisible).toBe(false);
    expect(searchInput.isVisible()).toBe(false);
  });

  it('renders the dropdown and checkbox components', () => {
    const dropdown = wrapper.findComponent(DropdownComponent);
    const checkbox = wrapper.findComponent(CheckBoxDropDown);

    expect(dropdown.exists()).toBe(true);
    expect(checkbox.exists()).toBe(true);
  });

  it('handles dropdown option selection', async () => {
    const dropdown = wrapper.findComponent(DropdownComponent);
    await dropdown.vm.$emit('selectOption', ['add']);
    expect(dropdown.emitted('selectOption')).toBeTruthy();
    expect(dropdown.emitted('selectOption')[0]).toEqual([['add']]);
  });

  it('updates selected options from CheckBoxDropDown', async () => {
    const checkbox = wrapper.findComponent(CheckBoxDropDown);

    await checkbox.vm.$emit('update-selected', ['user', 'email']);
    expect(wrapper.vm.selectedOptions).toEqual(['user', 'email']);
  });

  it('renders all buttons with correct labels', () => {
    expect(wrapper.find('.search-button span').text()).toBe('Search');
    expect(wrapper.find('.advanced-filter-button').text()).toContain(
      'Advanced Filters',
    );
    expect(wrapper.findComponent(PrimaryButton).props('buttonName')).toBe(
      'Export to Excel',
    );
    const dropdown = wrapper.findComponent(DropdownComponent);
    const checkbox = wrapper.findComponent(CheckBoxDropDown);

    expect(dropdown.props('dropDownTitle')).toBe('Bulk');
    expect(checkbox.props('checkBoxDropDownTitle')).toBe('Show/Hide Columns');
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(SearchFilterBar);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
