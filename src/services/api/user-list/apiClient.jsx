import axios from 'axios';
// Obtener el token de autenticación desde localStorage
const apiIp = import.meta.env.VITE_API;

const apiClient = axios.create({
  baseURL: `http://${apiIp}/api/ges_user`,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token en los encabezados de las solicitudes
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('No token found in localStorage');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized - Invalid token');
    }
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
