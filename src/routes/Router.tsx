import {createBrowserRouter} from "react-router-dom";
import * as React from "react";
import SuspendedPage from "../components/SuspendedPage.tsx";
import {isPrimaryKey} from "@/lib/utils.ts";

const Layout = React.lazy(()=>import("../components/wireframe/Layout"))
const Login = React.lazy(()=>import("../pages/auth/Login"))
const Register = React.lazy(()=>import("../pages/auth/Register"))

const Roles = React.lazy(()=>import("../pages/configurations/roles"))

const FinancialYearList = React.lazy(()=>import("../pages/configurations/financial-year-list"))
const FinancialYearAdd = React.lazy(()=>import("../pages/configurations/financial-year-add"))



const CaseCategoryList = React.lazy(()=>import("@/pages/configurations/departments/case-category"))
const CaseCategoryCreate = React.lazy(()=>import("@/pages/configurations/departments/case-category-create"))

const DepartmentList = React.lazy(()=>import("../pages/configurations/departments/departments-list"))
const DepartmentAdd = React.lazy(()=>import("../pages/configurations/departments/departments-add"))



const routes = createBrowserRouter(
    [
        {
            path: '/',
            element: <SuspendedPage page={<Login/>}/>
        },
        {
            path:"/home",
            element: <SuspendedPage page={<Layout/>}/>,
            children: [
                {
                  path: "dashboard",
                  element: <SuspendedPage page={<Register/>}/>
                },
                {
                    path: "users",
                    element: <SuspendedPage page={<Register/>}/>
                },
                {
                    path: "configurations",
                    children: [
                        {
                            path: "roles",
                            element: <SuspendedPage page={<Roles/>}/>
                        },
                        {
                            path: "financial-year",
                            children: [
                                {
                                    path: "",
                                    element: <SuspendedPage page={<FinancialYearList/>}/>
                                },
                                {
                                    path: ":financial_year_id",
                                    loader: ({params}) => {
                                        return {pageName: isPrimaryKey(params.financial_year_id as unknown as string) ? "Edit" : "Add"};
                                    },
                                    element: <SuspendedPage page={<FinancialYearAdd/>}/>
                                }
                            ]
                        },
                        {
                            path: "departments",
                            children: [
                                {
                                    path: "",
                                    element: <SuspendedPage page={<DepartmentList/>}/>
                                },
                                {
                                    path: ":department_id",
                                    loader: ({params}) => {
                                        return {pageName: isPrimaryKey(params.department_id as unknown as string) ? "Edit" : "Add"};
                                    },
                                    element: <SuspendedPage page={<DepartmentAdd/>}/>
                                }
                            ]

                        },
                        {
                            path: "case-category",
                            children: [
                                {
                                    path: "",
                                    element: <SuspendedPage page={<CaseCategoryList/>}/>,
                                },
                                {
                                    path: ":case_id",
                                    loader: ({params})=>{
                                        return {pageName: isPrimaryKey(params.case_id as unknown as string) ? "Edit" : "Add"}
                                    },
                                    element: <SuspendedPage page={<CaseCategoryCreate/>}/>
                                }
                            ]

                        }
                    ]
                }
            ]
        }
    ]
)

export default routes;