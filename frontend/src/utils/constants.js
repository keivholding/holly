const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://127.0.0.1:3000/api/v1'
    : 'https://holly-sjl9.onrender.com/api/v1';

export { API_URL };
