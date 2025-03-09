import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  
});

//  перехватчик для запросов    
api.interceptors/*<-перехватчик*/.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//  перехватчик для обработки ерора
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error(
          "Токен истек или невалиден, перенаправляем на страницу входа..."
        );
        localStorage.removeItem("authToken");
        window.location.href = "/login"; //вернул чела на логин
      }
    }
    return Promise.reject(error);
  }
);

export default api;
