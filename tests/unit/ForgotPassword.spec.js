import { shallowMount } from '@vue/test-utils';
import ForgotPassword from '@/components/login/ForgotPassword.vue';

describe('ForgotPassword.vue', () => {
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallowMount(ForgotPassword, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    mockRouter.push.mockClear();
  });

  it('renders all expected elements with dynamic data-id', () => {
    const dataIds = [
      'password-recovery-page',
      'username-input',
      'captcha-checkbox',
      'cancel-button',
      'forgot-username-link',
    ];

    dataIds.forEach((id) => {
      expect(wrapper.find(`[data-id="${id}"]`).exists()).toBe(true);
    });
  });

  it('shows a console log if captcha is not checked', async () => {
    console.log = jest.fn();

    await wrapper.setData({
      username: 'tester',
      captchaChecked: false,
    });

    wrapper.vm.handlePasswordRecovery();

    expect(console.log).toHaveBeenCalledWith(
      'Password recovery initiated for username: tester',
    );
    expect(console.log).toHaveBeenCalledWith(
      'Captcha not checked: Proceeding without user verification.',
    );
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('redirects to the home page on cancel button click', async () => {
    const cancelButton = wrapper.find('[data-id="cancel-button"]');
    await cancelButton.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('displays an error message if username is not entered', async () => {
    const submitButton = wrapper.find('form');

    await submitButton.trigger('submit.prevent');

    expect(wrapper.vm.errors.username).toBe('Username is required.');
    expect(wrapper.find('.error-message').text()).toBe('Username is required.');
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
