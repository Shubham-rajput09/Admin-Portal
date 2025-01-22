import { mount } from '@vue/test-utils';
import HeadingComponent from '@/components/common/HeadingComponent.vue';

describe('HeadingComponent.vue', () => {
  it('renders the heading with the correct text', () => {
    const heading = 'Hello World';
    const wrapper = mount(HeadingComponent, {
      props: {
        heading,
      },
    });
    const title = wrapper.find('.heading');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(heading);
  });
  it('accepts props and passes them correctly', () => {
    const heading = 'Test Button';
    const wrapper = mount(HeadingComponent, {
      propsData: { heading },
    });
    expect(wrapper.props('heading')).toBe(heading);
  });

  it('throws a warning if required prop is missing', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mount(HeadingComponent, {});
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toEqual(
      expect.stringContaining('Missing required prop: "heading"'),
    );
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
