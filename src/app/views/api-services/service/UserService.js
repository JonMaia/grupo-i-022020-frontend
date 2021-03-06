import CrowdfundingApi from "../CrowdfundingApi.js";

export const useUserService = () => {

    const findUserById = (id, token) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`crowdfunding/user/info/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
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

    const new_donate = (donation, token) => {
        console.log("entro");
        return new Promise((resolve, reject) => {
            CrowdfundingApi.post('crowdfunding/user/donate/', donation, {
                headers: {
                    'Authorization': token
                }
            })
                .then((response) => { resolve(response) })
                .catch((error) => { reject(error) });
        });
    }

    return { findUserById, login, new_donate }
}