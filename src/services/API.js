import axios, { Axios } from "axios";
import { baseUrl } from "./BaseUrl";

const API = axios.create({
    baseUrl, timeout: 10000
})
export default API;