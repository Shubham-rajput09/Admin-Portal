import { mount } from '@vue/test-utils';
import LoginPage from '@/components/login/LoginPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/dashboard', name: 'Dashboard' }],
});

describe('LoginPage.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(LoginPage, {
      global: {
        plugins: [router],
      },
    });
  });

  it('disables login button when form is not valid', async () => {
    await wrapper.setData({ username: '', password: '' });
    expect(wrapper.find('[data-id="login-button"]').element.disabled).toBe(
      true,
    );

    await wrapper.setData({
      username: 'test@domain.com',
      password: 'password123',
    });
    expect(wrapper.find('[data-id="login-button"]').element.disabled).toBe(
      false,
    );
  });

  it('navigates to dashboard on successful login', async () => {
    const push = jest.fn();
    wrapper.vm.$router.push = push;

    await wrapper.setData({
      username: 'test@domain.com',
      password: 'password123',
    });
    await wrapper.find('[data-id="login-form"]').trigger('submit.prevent');

    expect(push).toHaveBeenCalledWith('/dashboard');
  });

  it('shows an error message for invalid username format', async () => {
    await wrapper.setData({ username: 'invalid', password: 'password123' });
    await wrapper.find('[data-id="login-form"]').trigger('submit.prevent');

    // Error message for invalid username format
    expect(wrapper.find('[data-id="username-error"]').exists()).toBe(true);
    expect(wrapper.find('[data-id="username-error"]').text()).toBe(
      'Please enter a valid email address.',
    );
  });

  it('navigates to forgot-password route when link is clicked', async () => {
    const push = jest.fn();
    wrapper.vm.$router.push = push;

    await wrapper.find('[data-id="forgot-password-link"]').trigger('click');
    expect(push).toHaveBeenCalledWith('/forgot-password');
  });

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
