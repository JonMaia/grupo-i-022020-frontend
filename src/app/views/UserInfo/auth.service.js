import axios from "axios";
import CrowdfundingApi from "./CrowdfundingApi.js";

const API_URL = "https://grupo-i-022020-backend.herokuapp.com/";

class AuthService {
  login(user) {
    return new Promise((resolve, reject) => {
        CrowdfundingApi.post('crowdfunding/user/login/', user)
            .then(({ data: response }) => { 
              localStorage.setItem("user", JSON.stringify(response)); 
              return resolve(response);
            })
            .catch((error) => { reject(error) });
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();