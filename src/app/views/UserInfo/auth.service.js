import CrowdfundingApi from "./CrowdfundingApi.js";

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

  register(user) {
    return new Promise((resolve, reject) => {
      CrowdfundingApi.post('crowdfunding/user/create/', user)
          .then(({ data: response }) => { resolve(response) })
          .catch((error) => { reject(error) });
  });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();