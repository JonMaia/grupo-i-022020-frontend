import CrowdfundingApi from "../CrowdfundingApi.js";

export const useProjectService = () => {

    const open_projects = () => {
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

    const next_finish = () => {
        return new Promise((resolve, reject) => {
            CrowdfundingApi.get(`/crowdfunding/project/next_finish`)
                .then(({ data: respuesta }) => { resolve(respuesta) })
                .catch((error) => { reject(error) });
        });
    }

    return { open_projects, next_finish}
}