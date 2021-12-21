import axios, { Axios } from "axios";
import { baseUrl } from "./BaseUrl";
import store from "../store";

const API = axios.create({
    baseUrl, timeout: 10000
})



export default API;


