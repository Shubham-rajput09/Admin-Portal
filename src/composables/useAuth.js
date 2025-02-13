export function useAuth() {
  const setToken = (newToken) => {
    sessionStorage.setItem('token', newToken);
  };

  const getToken = () => {
    return sessionStorage.getItem('token');
  };

  const removeToken = () => {
    sessionStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    return !!getToken();
  };

  return { setToken, getToken, removeToken, isAuthenticated };
}
