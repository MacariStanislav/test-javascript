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

//  перехватчик для ответов в данном случае ерора
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



// const myInterceptor = axios.interceptors.request.use(function () {
//     console.log('Перехватчик работает');
//   });
  
//   // Удаляем перехватчик
//   axios.interceptors.request.eject(myInterceptor);


// error.response — для ошибок с кодами состояния за пределами диапазона 2xx.
// error.request — для случаев, когда запрос был выполнен, но ответ не был получен.
// error.message — для ошибок, произошедших при настройке запроса.
// validateStatus — позволяет настроить, какие коды состояния должны рассматриваться как успешные или ошибочные.