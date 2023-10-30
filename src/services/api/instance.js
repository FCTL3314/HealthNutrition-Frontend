import axios from 'axios';
import {BASE_API_URL} from '@/constants'

const instance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    accept: 'application/json',
  }
});

export default instance;
