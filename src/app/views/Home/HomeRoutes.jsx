import {MatxLoadable} from "matx";

const AppHome = MatxLoadable({
    loader: () => import('./AppHome')
});

const homeRoutes = [
    {
        path: "/home",
        component: AppHome
    }
]

export default homeRoutes;
