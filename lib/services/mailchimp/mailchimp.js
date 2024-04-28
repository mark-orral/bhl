import axios from "axios";

const URL = process.env.MAILCHIMP_API_URL;
const TOKEN = process.env.MAILCHIMP_TOKEN;

const mailchimp = axios.create({
  baseURL: URL,
  timeout: 25000,
  headers: {
    Authorization: `Bearer: ${TOKEN}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default mailchimp;
