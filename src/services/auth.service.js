import apiInstance from "./apiInstance";

class AuthService {
  constructor() {
    this.api = apiInstance;
  }

  signup(data) {
    return this.api.post("/auth/signup", data);
  }

  login(data) {
    return this.api.post("/auth/login", data);
  }

  verify(token) {
    return this.api.get(`/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAll(token) {
    const userId = token;

    if (!userId) {
      return Promise.reject("Token no válido");
    }
    return this.api.get(`/characters/${userId}`);
  }

  logout() {
    return this.api.post("/auth/logout");
  }
}

const authService = new AuthService();

export default authService;
