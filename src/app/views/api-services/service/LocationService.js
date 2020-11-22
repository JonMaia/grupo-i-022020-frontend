import CrowdfundingApi from "../CrowdfundingApi.js";
import AuthUser from "../AuthService"

export const useLocationService = () => {

    const findAll = () => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`/crowdfunding/location/findAll`, {
                headers: {
                    'Authorization': AuthUser.getCurrentUser().token
                }
            })
                .then((response) => { resolve(response) })
                .catch((error) => { reject(error) });
        });
    }

    const findLocationById = (id, token) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`/crowdfunding/location/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }

    return { findAll, findLocationById}
}