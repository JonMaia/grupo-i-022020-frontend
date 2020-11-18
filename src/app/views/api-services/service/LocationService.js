import CrowdfundingApi from "../CrowdfundingApi.js";

export const useLocationService = () => {

    const findAll = () => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`/crowdfunding/location/findAll`)
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }

    const findLocationById = (id, token) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`/crowdfunding/location/${id}`, , {
                headers: {
                    'Authorization': token
                }
            })
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }

    return { open_projects, findLocationById}
}