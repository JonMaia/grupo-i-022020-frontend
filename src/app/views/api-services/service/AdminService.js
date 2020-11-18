import CrowdfundingApi from "../CrowdfundingApi.js";

export const useAdminService = () => {

    const createProject = (project, token) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`backoffice/create_project`, project, {
                headers: {
                    'Authorization': token
                }
            })
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }
    
    const finishCollection = (user) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.put('backoffice/finish_collection', project, {
                headers: {
                    'Authorization': token
                }
            })
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }

    return { createProject, finishCollection }
}