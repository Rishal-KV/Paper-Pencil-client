import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
