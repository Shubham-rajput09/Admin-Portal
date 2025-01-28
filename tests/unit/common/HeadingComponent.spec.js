import { mount } from '@vue/test-utils';
import HeadingComponent from '@/components/common/HeadingComponent.vue';

describe('PageHeader.vue', () => {
  const headingTitle = 'Hello World';
  let wrapper;
  beforeEach(() => {
    wrapper = mount(HeadingComponent, {
      propsData: {
        heading: headingTitle,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('renders the heading with the correct text', () => {
    const title = wrapper.find('[data-id="heading"]');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(headingTitle);
  });
  it('accepts props and passes them correctly', () => {
    const heading = 'Heading Test';
    const wrapper = mount(HeadingComponent, {
      propsData: { heading },
    });
    expect(wrapper.find('[data-id="heading"]').exists()).toBe(true);
    expect(wrapper.props('heading')).toBe(heading);
  });

  it('matches snapshot', () => {
    const wrapper = mount(HeadingComponent, {
      propsData: {
        heading: 'Snapshot Test', // Correct prop name
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
