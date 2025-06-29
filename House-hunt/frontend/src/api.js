import axios from "axios";

const API = axios.create({
 baseURL: "https://house-hunt-2.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ Must have Bearer
  }
  return config;
});

export default API;
