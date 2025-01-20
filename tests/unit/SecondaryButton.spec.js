import { mount } from '@vue/test-utils';
import SecondaryButton from '@/components/common/SecondaryButton';

describe('SecondaryButton.vue', () => {
  it('renders button name correctly', () => {
    const secondaryButton = 'Secondary Button';
    const wrapper = mount(SecondaryButton, {
      propsData: {
        secondaryButton,
      },
    });
    const title = wrapper.find('button');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(secondaryButton);
  });
});
