import {Columns3Cog, Group, LayoutDashboard, SettingsIcon, ShieldUser, UserCircle} from "lucide-react";
import {JSX} from "react";

export type MenuItem = {
    id: string,
    title: string,
    path: string,
    icon?: JSX.Element
    children?: MenuItem[]
}

const adminMenu: MenuItem [] = [
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
                id: "configuration-case-category",
                title: "Case category",
                path: "/configurations/configuration-case-category",
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