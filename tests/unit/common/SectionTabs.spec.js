import { mount } from '@vue/test-utils';
import SectionTabs from '@/components/common/SectionTabs.vue';

describe('SectionTabs.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SectionTabs, {
      propsData: {
        sectionTabs: [
          { name: 'tab1', label: 'Tab 1' },
          { name: 'tab2', label: 'Tab 2' },
        ],
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('matches snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
