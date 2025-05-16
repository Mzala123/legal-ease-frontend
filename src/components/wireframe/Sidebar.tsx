import {cn} from "@/utils.ts";
import adminMenu, {MenuItem} from "@/menus/admin-menu/admin-menu.tsx";
import {Link, useLocation} from "react-router-dom";
import {ChevronDown} from "lucide-react";
import {useState} from "react";

type SideBarProps = {
    isOpen: boolean
}

export default function Sidebar({isOpen}: SideBarProps) {

    const location = useLocation();
    const [openSubmenuId, setOpenSubmenuId] = useState<string[]>([]);
    function toggleSubmenu(parentId: string) {
        console.log(openSubmenuId);
        setOpenSubmenuId(
            prevState => prevState.includes(parentId) ?  prevState.filter(id=> id !== parentId) :
                    [
                        ...prevState,
                        parentId
                    ]
        );
        console.log(openSubmenuId);
    }

    return (
        <div className={cn("fixed z-10 min-w-72 w-72 shadow-md border-r h-screen transition-all ease-in-out bg-white border-stone-300 -left-72 lg:shadow-none", isOpen && "left-0")}>
            <div className="h-16 flex items-center justify-between border-b border-stone-300 left-0 right-0">
               <div className="mt-16 hidden lg:mt-0 pl-4 pt-4 lg:pt-0 lg:flex">Admin</div>
           </div>
            <div className="h-[calc(100vh-4rem)] overflow-y-auto pt-4 scrollbar-thin scrollbar-thumb-rounded">
                <div className="flex flex-col gap-1">
                {
                    adminMenu.map((menu) =>{
                        const linkIsActive: boolean =  location.pathname === menu.path
                        return (
                            <div key={menu.id} className="flex items-center text-sm gap-1">
                                {
                                    menu.children &&  menu.children.length > 0  ?
                                        (
                                            <div className="w-full">
                                                {
                                                    <div>
                                                        <div className="flex items-center w-full hover:bg-stone-100 hover:text-blue-700 ">
                                                            <div className={cn(`bg-transparent h-4 w-[4px] rounded-2xl ml-[0.5px]`, "")}></div>
                                                            <button onClick={()=>toggleSubmenu(menu.id)} className={cn("flex justify-between w-full py-2 px-3 ")}>
                                                                <div className="flex items-center gap-2"><span className="">{menu.icon}</span>{menu.title}<span></span> </div>
                                                                <div className={"flex items-center"}><ChevronDown size={18} strokeWidth={2}/></div>
                                                            </button>
                                                        </div>
                                                        <div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            {openSubmenuId.includes(menu.id) && menu.children.map((child: MenuItem) => {
                                                                const subLinkIsActive: boolean = location.pathname === child.path
                                                                return (
                                                                    <Link key={child.id} className={cn("ml-4 relative flex items-center gap-2 mt-1 px-3 py-2 hover:rounded-l hover:bg-stone-100 hover:text-blue-700", subLinkIsActive && "text-blue-700")} to={child.path}>
                                                                        <span className="">{child.icon && child.icon}</span>
                                                                        {child.title}
                                                                    </Link>
                                                                )
                                                            })
                                                            }
                                                        </div>

                                                    </div>
                                                }
                                            </div>
                                        ) :
                                        (
                                            <div className={cn("flex items-center hover:bg-stone-100 hover:text-blue-700 w-full", linkIsActive && "bg-stone-100")}>
                                                <div className={cn(`bg-transparent h-4 w-[4px] rounded-2xl ml-[0.5px] hover:bg-blue-700`,  linkIsActive && "bg-blue-700")}></div>
                                                <Link to={`${menu.path}`} className={cn("flex justify-between w-full py-2 px-3", linkIsActive && "text-blue-700")}>
                                                    <div className="flex items-center gap-2"><span className="">{menu.icon}</span>{menu.title}<span></span> </div>
                                                </Link>
                                            </div>
                                        )
                                }
                            </div>
                        )
                    })
                }
             </div>
            </div>
        </div>
    )
}