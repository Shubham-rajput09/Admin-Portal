import { mount } from '@vue/test-utils';
import Table from '@/components/common/TableComponent.vue';

describe('Table.vue', () => {
  let wrapper;

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
  ];

  const data = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
  ];

  beforeEach(() => {
    wrapper = mount(Table, {
      propsData: {
        columns,
        data,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders table with correct columns and data', () => {
    const thElements = wrapper.findAll('th');
    const tdElements = wrapper.findAll('td');

    expect(thElements.length).toBe(columns.length);
    expect(tdElements.at(0).text()).toBe('Alice');
    expect(tdElements.at(1).text()).toBe('30');
  });

  it('sorts data in ascending order when a column header is clicked', async () => {
    const thName = wrapper.find('th');
    await thName.trigger('click');
    expect(wrapper.vm.sortKey).toBe('name');
    expect(wrapper.vm.sortOrder).toBe('asc');
  });

  it('sorts data in descending order when the same column header is clicked again', async () => {
    const thName = wrapper.find('th');
    expect(thName.exists()).toBe(true);
    await thName.trigger('click');
    expect(wrapper.vm.sortOrder).toBe('asc');
    await thName.trigger('click');
    expect(wrapper.vm.sortOrder).toBe('desc');
  });
});
