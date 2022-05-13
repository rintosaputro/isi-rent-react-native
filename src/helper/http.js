import axios from 'axios';
import BACKEND_URL from './BackendUrl';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: BACKEND_URL,
    headers,
  });
};

export default http;
