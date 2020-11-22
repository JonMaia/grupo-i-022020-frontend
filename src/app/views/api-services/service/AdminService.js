import CrowdfundingApi from "../CrowdfundingApi.js";
import AuthService from "../AuthService"

export const useAdminService = () => {

    const createProject = (project) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.post(`backoffice/create_project`, project, {
                headers: {
                    'Authorization': AuthService.getCurrentUser().token
                }
            })
                .then((response) => { resolve(response) })
                .catch((error) => { reject(error) });
        });
    }
    
    const finishCollection = (project, token) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.put('backoffice/finish_collection', project, {
                headers: {
                    'Authorization': token
                }
            })
            .then((response) => { resolve(response) })
            .catch((error) => { reject(error) });
        });
    }

    return { createProject, finishCollection }
}