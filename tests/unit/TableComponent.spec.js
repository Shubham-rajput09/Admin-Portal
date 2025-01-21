import { mount } from '@vue/test-utils';
import Table from '@/components/common/TableComponent.vue';
import TableComponent from '@/components/common/TableComponent.vue';

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

  it('accepts props and passes them correctly', () => {
    const wrapper = mount(TableComponent, {
      props: { columns: columns, data: data },
    });
    expect(wrapper.props('columns')).toStrictEqual(columns);
    expect(wrapper.props('data')).toStrictEqual(data);
  });

  it('throws a warning if required props are missing', () => {
    // Mock `console.warn`
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    // Mount the component with missing props
    mount(TableComponent, {});

    // Filter warnings for missing "columns" and "data" props
    const filteredWarnings = warnSpy.mock.calls.filter(
      ([message]) =>
        message.includes('Missing required prop: "columns"') ||
        message.includes('Missing required prop: "data"'),
    );

    // Check that the specific warnings were triggered
    expect(filteredWarnings.length).toBe(2);
    expect(filteredWarnings[0][0]).toEqual(
      expect.stringContaining('Missing required prop: "columns"'),
    );
    expect(filteredWarnings[1][0]).toEqual(
      expect.stringContaining('Missing required prop: "data"'),
    );
    warnSpy.mockRestore();
  });

  it('matches snapshot', () => {
    const wrapper = mount(TableComponent, {
      propsData: { columns: columns, data: data },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
