import {createBrowserRouter} from "react-router-dom";
import Layout from "../components/wireframe/Layout.tsx";


const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout/>
        }
    ]
)

export default routes;