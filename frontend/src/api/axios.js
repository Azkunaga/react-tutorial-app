import axios from "axios";
import { refresh } from "../hooks/refresh";
const SERVER_URL = "http://localhost:3001"

const normalAxios = axios.create({
  baseURL: SERVER_URL,
});

const authAxios = axios.create({
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

authAxios.interceptors.request.use(
  config => {
      const accessToken = localStorage.getItem('userData').accessToken;
      if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
  }, (error) => {
      Promise.reject(error)
  }
);

authAxios.interceptors.response.use(
  response => response,
  async (error) => {
      const previousReq = error?.config;
      if (error?.response?.status === 403 && !previousReq?.sent) {
          prevRequest.sent = true;
          const accessToken = await refresh();
          previousReq.headers['Authorization'] = `Bearer ${accessToken}`;
          return authAxios(prevRequest);
      }
      return Promise.reject(error);
  }
);

export {
  normalAxios,
  authAxios,
}