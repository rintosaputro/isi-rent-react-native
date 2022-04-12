import axios from 'axios';

const BACKEND_URL = 'http://192.168.43.195:5000';
const BACKEND_URL2 = 'https://isi-rent.herokuapp.com';

const http = token => {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    // baseURL: 'http://192.168.43.195:5000',
    baseURL: BACKEND_URL2,
    headers,
  });
};

export default http;
