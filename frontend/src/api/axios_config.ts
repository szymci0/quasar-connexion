import axios, { AxiosInstance } from 'axios';
import { useUserStore } from '../stores/userStore';

export const BASE_URL = '/api/'
// export const BASE_URL = String(process.env.API_URL);  // works only when app served by backend server, for local set to full url

export default function getCrudifulAxios (): AxiosInstance {
  const headers: Record<string, string> = {}
  const store = useUserStore();
  const token = store.authorization;
  headers['Content-Type'] = 'application/json';
  headers['Access-Control-Allow-Origin'] = '*';
  if (!!token) {
    headers['Authorization'] = `${token}`
  }

  return axios.create({
    baseURL: BASE_URL,
    timeout: 60 * 1000,  // 60 seconds
    headers: headers
  })
}
