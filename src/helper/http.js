import axios from 'axios';

const BACKEND_URL = '192.168.43.195:5000';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: 'http://192.168.43.195:5000',
    headers,
  });
};

export default http;
