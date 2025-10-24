import { type RouteConfig, index } from "@react-router/dev/routes";

export default [
    {
        path: "/",
        file: "routes/home/route.tsx", // Home route
    },
    {
        path: "/dashboard/developer",
        file: "routes/dashboard/developer/route.tsx", // Home route
    },
    {
        path: "/dashboard/manager",
        file: "routes/dashboard/manager/route.tsx", // Home route
    },
     {
        path:"sign-up",
        file: "routes/sign-up/route.tsx", // Home route
    },
] satisfies RouteConfig;
