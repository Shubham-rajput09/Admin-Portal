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
});
