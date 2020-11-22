import CrowdfundingApi from "./CrowdfundingApi.js";

class AuthService {

  loginAdmin(user) {
    return new Promise((resolve, reject) => {
      CrowdfundingApi.post('backoffice/login', user, {
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'}
        })
        .then(({ data: response }) => { 
          localStorage.setItem("user", JSON.stringify(response)); 
          return resolve(response);
        })
        .catch((error) => { reject(error) });
    });
  }

  login(user) {
    return new Promise((resolve, reject) => {
      CrowdfundingApi.post('crowdfunding/user/login', user)
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
      CrowdfundingApi.post('crowdfunding/user/create', user , {
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json'}
        })
        .then(({ data: response }) => { resolve(response) })
        .catch((error) => { reject(error) });
  });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  create_project(project, token) {
    return new Promise((resolve, reject) => {
      CrowdfundingApi.post(`/backoffice/create_project`, project, {
        headers: {
          'Authorization': token
        }
      })
          .then(({ data: respuesta }) => { resolve(respuesta) })
          .catch((error) => { reject(error) });
    });
  }
}

export default new AuthService();