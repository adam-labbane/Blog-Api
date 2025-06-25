import axios from 'axios';

const API = axios.create({
  baseURL: 'https://blog-api-nine-vert.vercel.app/',
});

export default API;
