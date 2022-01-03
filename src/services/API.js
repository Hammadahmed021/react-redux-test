import axios from "axios";
import { baseUrl } from "./BaseUrl";
import store from "../store";

const API = axios.create({
  baseURL:baseUrl,
  timeout: 10000,
});

export const setAuthToken = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default API;
