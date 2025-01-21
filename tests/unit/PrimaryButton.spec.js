import { mount } from '@vue/test-utils';
import PrimaryButton from '@/components/common/PrimaryButton.vue';

describe('PrimaryButton.vue', () => {
  it('renders button name correctly', () => {
    const buttonName = 'PrimaryButton';
    const wrapper = mount(PrimaryButton, {
      propsData: {
        buttonName,
      },
    });
    const title = wrapper.find('button');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(buttonName);
  });

  it('accepts props and passes them correctly', () => {
    const buttonName = 'Test Button';
    const wrapper = mount(PrimaryButton, {
      propsData: { buttonName },
    });
    expect(wrapper.props('buttonName')).toBe(buttonName);
  });

  it('throws a warning if required prop is missing', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mount(PrimaryButton, {});
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0][0]).toEqual(
      expect.stringContaining('Missing required prop: "buttonName"'),
    );
  });

  it('matches snapshot', () => {
    const wrapper = mount(PrimaryButton, {
      propsData: {
        buttonName: 'Snapshot Test', // Correct prop name
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
