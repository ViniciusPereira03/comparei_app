let authToken: string | null = null;

export const tokenStore = {
  setToken(token: string | null) {
    authToken = token;
  },
  getToken() {
    return authToken;
  },
};
