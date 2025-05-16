import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/wireframe/Layout.tsx";
import {Login} from "@/pages/auth/Login.tsx";
import {Register} from "@/pages/auth/Register.tsx";


const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <Login/>
        },
        {
            path:"/home",
            element: <Layout/>,
            children: [
                {
                  path: "dashboard",
                  element: <Register/>
                },
                {
                    path: "users",
                    element: <Register/>
                }
            ]
        }
    ]
)

export default routes;