import axios from 'axios';

const API = axios.create({
  baseURL: 'https://ton-backend.vercel.app',
});

export default API;
