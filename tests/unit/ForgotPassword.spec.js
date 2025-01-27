import { shallowMount } from '@vue/test-utils';
import ForgotPassword from '@/components/login/ForgotPassword.vue'; // Adjust path as needed

describe('ForgotPassword.vue', () => {
  let wrapper;
  const mockRouter = {
    push: jest.fn(), // Mock the push function
  };

  beforeEach(() => {
    wrapper = shallowMount(ForgotPassword, {
      global: {
        mocks: {
          $router: mockRouter, // Provide the mocked router
        },
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
    mockRouter.push.mockClear(); // Clear mock calls after each test
  });

  it('renders the password recovery form correctly', () => {
    expect(wrapper.find('[data-id="password-recovery-page"]').exists()).toBe(
      true,
    );
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('shows a console log if captcha is not checked', async () => {
    console.log = jest.fn(); // Mock console.log

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
    expect(mockRouter.push).toHaveBeenCalledWith('/'); // Ensure redirection works
  });

  it('redirects to the home page on cancel button click', async () => {
    const cancelButton = wrapper.find('[data-id="cancel-button"]');
    await cancelButton.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith('/'); // Ensure redirection works
  });

  it('displays an error message if username is not entered', async () => {
    const submitButton = wrapper.find('form');

    await submitButton.trigger('submit.prevent'); // Simulate form submission

    expect(wrapper.vm.errors.username).toBe('Username is required.');
    expect(wrapper.find('.error-message').text()).toBe('Username is required.');
    expect(mockRouter.push).not.toHaveBeenCalled(); // Ensure no redirection happens
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot(); // Create a snapshot for the rendered HTML structure
  });
});
