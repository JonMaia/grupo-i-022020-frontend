import axios from "axios";

export default axios.create({
  baseURL: "https://grupo-i-022020-backend.herokuapp.com/",
  responseType: "application/json" // default
});