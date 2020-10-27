import {MatxLoadable} from "matx";

const AppUserInfo = MatxLoadable({
    loader: () => import('./AppUserInfo')
});

const userInfoRoutes = [
    {
        path: "/user/info",
        component: AppUserInfo
    }
]

export default userInfoRoutes;