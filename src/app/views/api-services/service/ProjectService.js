import CrowdfundingApi from "../CrowdfundingApi.js";

export const useProjectService = () => {

    const open_projects = (token) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`/crowdfunding/project/open_projects` , {
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }

    const next_finish = (token) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`/crowdfunding/project/next_finish`, {
                headers: {
                    'Authorization': token,
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(({ data: respuesta }) => { resolve(respuesta) })
            .catch((error) => { reject(error) });
        });
    }

    const get_project = (id, token) => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`/crowdfunding/project/${id}`, {
                headers: {
                    'Authorization': token
                }
            })
            .then(({ data: respuesta }) => { resolve(respuesta) })
            .catch((error) => { reject(error) });
        });
    }

    return { open_projects, next_finish, get_project }
}