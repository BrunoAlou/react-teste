import axios from "axios";
import { getToken } from "./auth";

const apiAdonis = axios.create({
  baseURL: "http://127.0.0.1:3333"
});

apiAdonis.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiAdonis;