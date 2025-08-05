import {
    CalendarCog,
    Columns3Cog,
    Group,
    LayoutDashboard,
    Network,
    SettingsIcon,
    ShieldUser,
    UserCircle
} from "lucide-react";
import {JSX} from "react";

export type MenuItem = {
    id: string,
    title: string,
    path: string,
    icon?: JSX.Element
    children?: MenuItem[]
}

const adminMenu: MenuItem []  = [
    {
      id: "dashboard",
      title: "Dashboard",
      path: "/home/dashboard",
      icon: <LayoutDashboard size={16}/>
    },
    {
        id: "users",
        title: "Users",
        path: "/home/users",
        icon: <UserCircle size={16}/>
    },
    {
        id: "configurations",
        title: "Configurations",
        path: "/home/configurations",
        icon: <Columns3Cog size={16}/>,
        children: [
            {
               id: "roles",
               title: "Access",
               path: "/home/configurations/roles",
               icon: <ShieldUser size={16}/>
            },
            {
                id: "financial-year",
                title: "Financial Years",
                path: "/home/configurations/financial-year",
                icon: <CalendarCog size={16}/>
            },
            {
                id: "departments",
                title: "Departments",
                path: "/home/configurations/departments",
                icon: <Network size={16}/>
            },
            {
                id: "case-category",
                title: "Case category",
                path: "/home/configurations/case-category",
                icon: <Group size={16}/>,
            }
        ]
    },
    {
        id: "settings",
        title: "Settings",
        path: "/home/settings",
        icon: <SettingsIcon size={16}/>,
        children: [
            {
                id: "settings-legal-ease-users",
                title: "setting ease users",
                path: "/configurations/settings-ease-users",
                icon: <ShieldUser size={16}/>,
            }


        ]
    }
]

export default adminMenu