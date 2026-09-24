import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); 

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401) {
      
      if (originalRequest.url && !originalRequest.url.includes("/auth/login")) {
        Cookies.remove("token");
        Cookies.remove("user_session");
        
        if (typeof window !== "undefined") {
          window.location.href = "/explore"; 
        }
      }
    }
    
    return Promise.reject(error);
  }
);