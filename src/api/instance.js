import axios from 'axios';
import constants from '@/constants'

const instance = axios.create({
  baseURL: constants.BASE_API,
  withCredentials: true,
  headers: {
    accept: 'application/json',
  }
});

export default instance;
