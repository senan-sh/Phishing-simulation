export const getToken = (): string | null => localStorage.getItem("token");

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};

export const setToken = (token: string) => localStorage.setItem("token", token);

export const removeToken = () => localStorage.removeItem("token");
