import { mount } from '@vue/test-utils';
import ContactUs from '@/components/login/ContactUs.vue';

describe('ContactUs.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ContactUs);
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
