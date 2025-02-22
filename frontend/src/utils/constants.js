const API_URL =
  import.meta.env.MODE === 'development'
    ? 'http://127.0.0.1:3000'
    : 'https://holly-sjl9.onrender.com';

export { API_URL };
