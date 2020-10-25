import CrowdfundingApi from "./CrowdfundingApi.js";

export const useUserService = () => {

    const findUserById = (id) => {
        return new Promise((resolve) => {
            CrowdfundingApi.get(`crowdfunding/user/points/${id}`)
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { resolve(error) });
        });

    }
    
    return { findUserById }
}