import CrowdfundingApi from "../CrowdfundingApi.js";

export const useUserService = () => {

    const findUserById = (id) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`crowdfunding/user/info/2`)
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }
    
    const login = (user) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.post('crowdfunding/user/login/', user)
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }
    return { findUserById, login }
}