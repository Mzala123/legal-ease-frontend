import {cn} from "@/utils.ts";
import adminMenu from "@/menus/admin-menu/admin-menu.tsx";
import SubmenuDropdown from "@/components/ui/submenu-dropdown.tsx";

type SideBarProps = {
    isOpen: boolean
}

export default function Sidebar({isOpen}: SideBarProps) {



    return (
        <div className={cn("fixed z-10 min-w-72 w-72 shadow-md border-r h-screen transition-all ease-in-out bg-white border-stone-300 -left-72 lg:shadow-none", isOpen && "left-0")}>
            <div className="h-16 flex items-center justify-between border-b border-stone-300 left-0 right-0">
               <div className="mt-16 hidden lg:mt-0 pl-4 pt-4 lg:pt-0 lg:flex">Admin</div>
           </div>
            <div className="h-[calc(100vh-4rem)] overflow-y-auto pt-4 scrollbar-thin scrollbar-thumb-rounded">
                <SubmenuDropdown menuList={adminMenu}/>
            </div>
        </div>
    )
}