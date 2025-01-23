import { mount } from '@vue/test-utils';
import NavigationBar from '@/components/common/NavigationBar.vue';
import tableData from '@/json/tableData.json';

jest.mock('@/json/tableData.json', () => ({
  userColumn: [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
  ],
  auditColumn: [
    { key: 'action', label: 'Action' },
    { key: 'date', label: 'Date' },
  ],
  userData: [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
  ],
  auditData: [],
}));

describe('NavigationBar.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(NavigationBar, {
      stubs: ['SearchBar', 'TableComponent'],
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the correct initial tab', () => {
    const userTab = wrapper.find('.navbar-item.active');
    expect(userTab.text()).toBe('Users');
    expect(wrapper.vm.selected).toBe('user');
  });

  it('switches to the Audit Log tab when clicked', async () => {
    const auditLogTab = wrapper.findAll('.navbar-item').at(1);
    await auditLogTab.trigger('click');

    expect(wrapper.vm.selected).toBe('auditLog');
    expect(auditLogTab.classes()).toContain('active');
  });

  it('filters columns and data based on the selected tab', async () => {
    expect(wrapper.vm.filteredColumns).toEqual(tableData.userColumn);
    expect(wrapper.vm.filteredData).toEqual(tableData.userData);

    const auditLogTab = wrapper.findAll('.navbar-item').at(1);
    await auditLogTab.trigger('click');

    expect(wrapper.vm.filteredColumns).toEqual(tableData.auditColumn);
    expect(wrapper.vm.filteredData).toEqual(tableData.auditData);
  });

  it('matches snapshot', () => {
    const wrapper = mount(NavigationBar);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
