import axios from "axios";
import { store } from "../app/reduxProvider/ReduxProvider";
import { logoutUser } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log(error)
    const status = error.response?.status;
    const url = error.config?.url || "";

    const ignoreRoutes = [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/me",
    ];

    const shouldIgnore = ignoreRoutes.some((route) => url.includes(route));

    if (status === 401 && !shouldIgnore) {
      await store.dispatch(logoutUser());
    }

    return Promise.reject(error);
  },
);

export default api;
