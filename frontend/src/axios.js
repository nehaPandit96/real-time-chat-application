import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000", // base URL of the backend server
});

export default instance;
