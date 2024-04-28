import axios from "axios";
import { API_URL } from "@/lib/utils/constants";

const strapi = axios.create({
  baseURL: API_URL,
  timeout: 25000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default strapi;
