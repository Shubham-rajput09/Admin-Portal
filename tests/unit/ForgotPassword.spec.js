import { mount } from '@vue/test-utils';
import ForgotPassword from '@/components/login/ForgotPassword.vue';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

jest.mock('vue-router', () => ({
  useRouter: jest.fn(),
}));

describe('ForgotPassword.vue', () => {
  let wrapper;
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockRouterPush });

    wrapper = mount(ForgotPassword, {
      global: {
        plugins: [],
      },
    });
  });

  it('should render the Forgot Password page correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Password Recovery');
    expect(wrapper.find('p').text()).toBe(
      'Enter your email to receive an email with Password Reset instructions.',
    );
    expect(wrapper.find('button.submit-button').exists()).toBe(true);
    expect(wrapper.find('button.cancel-button').exists()).toBe(true);
  });

  it('should not submit the form if captcha is not checked', async () => {
    const emailInput = wrapper.find('input[type="email"]');
    const captchaCheckbox = wrapper.find('input[type="checkbox"]');
    const submitButton = wrapper.find('button.submit-button');

    await emailInput.setValue('validemail@example.com');
    await captchaCheckbox.setChecked(false);

    await submitButton.trigger('click');
    await nextTick(); // Ensure the form is re-rendered

    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it('should call goBack method and navigate to home on cancel button click', async () => {
    const cancelButton = wrapper.find('button.cancel-button');

    await cancelButton.trigger('click');
    await nextTick(); // Ensure the form is re-rendered

    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  it('should render the "Forgot Email?" link correctly', () => {
    const forgotEmailLink = wrapper.find('a.forgot-email');

    expect(forgotEmailLink.exists()).toBe(true);
    expect(forgotEmailLink.text()).toBe('Forgot Email?');
  });

  it('should have correct initial form values', () => {
    const emailInput = wrapper.find('input[type="email"]');
    const captchaCheckbox = wrapper.find('input[type="checkbox"]');

    expect(emailInput.element.value).toBe('');
    expect(captchaCheckbox.element.checked).toBe(false);
  });
});
