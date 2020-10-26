import {MatxLoadable} from "matx";

const AppInfoProject = MatxLoadable({
    loader: () => import('./AppInfoProject')
});

const infoProjectRoutes = [
    {
        path: "/user/info-project",
        component: AppInfoProject
    }
]

export default infoProjectRoutes;
