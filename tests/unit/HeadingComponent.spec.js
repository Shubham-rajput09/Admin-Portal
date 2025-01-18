import { mount } from '@vue/test-utils';
import HeadingComponent from '@/components/common/HeadingComponent.vue';

describe('Heading Component', () => {
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
});
