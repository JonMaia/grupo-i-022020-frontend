import {MatxLoadable} from "matx";

const AppCreateProject = MatxLoadable({
    loader: () => import('./AppCreateProject')
});

const createProjectRoutes = [
    {
        path: "/admin/create-project",
        component: AppCreateProject
    }
]

export default createProjectRoutes;
