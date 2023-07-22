import axios from "axios";

const apiInstace = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

apiInstace.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiInstace;
