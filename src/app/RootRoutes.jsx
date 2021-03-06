import React from "react";
import { Redirect } from "react-router-dom";

import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import utilitiesRoutes from "./views/utilities/UtilitiesRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";

import materialRoutes from "./views/material-kit/MaterialRoutes";
import dragAndDropRoute from "./views/Drag&Drop/DragAndDropRoute";

import formsRoutes from "./views/forms/FormsRoutes";
import mapRoutes from "./views/map/MapRoutes";

import homeRoutes from "./views/Home/HomeRoutes.jsx"; 
import createProjectRoutes from "./views/CreateProject/CreateProjectRoutes.jsx";
import infoProjectRoutes from "./views/InfoProject/InfoProjectRoutes.jsx"
import userInfoRoutes from "./views/UserInfo/UserInfoRoutes.jsx";

const redirectRoute = [
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/session/signup" />
  }
];

const errorRoute = [
  {
    component: () => <Redirect to="/session/404" />
  }
];

const routes = [
  ...sessionRoutes,
  ...dashboardRoutes,
  ...materialRoutes,
  ...utilitiesRoutes,
  ...dragAndDropRoute,
  ...formsRoutes,
  ...mapRoutes,
  ...homeRoutes,
  ...createProjectRoutes,
  ...infoProjectRoutes,
  ...userInfoRoutes,
  ...redirectRoute,
  ...errorRoute
];

export default routes;
