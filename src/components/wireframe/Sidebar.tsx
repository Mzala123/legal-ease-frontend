import {cn} from "@/utils.ts";
import adminMenu, {MenuItem} from "@/menus/admin-menu/admin-menu.tsx";
import {Link} from "react-router-dom";
import {ChevronDown} from "lucide-react";
import {useState} from "react";

type SideBarProps = {
    isOpen: boolean
}

export default function Sidebar({isOpen}: SideBarProps) {

    const [openSubmenuId, setOpenSubmenuId] = useState<string[]>([]);
    function toggleSubmenu(parentId: string) {
        setOpenSubmenuId(
            prevState => prevState.includes(parentId) ?  prevState.filter(id=> id !== parentId) :
                    [
                        ...prevState,
                        parentId
                    ]
        );
    }

    return (
        <div className={cn("fixed z-10 min-w-72 w-72 shadow-md border-r h-full transition-all ease-in-out bg-white border-stone-300 -left-72 lg:shadow-none", isOpen && "left-0")}>
               <div className="h-16 flex items-center justify-between border-b border-stone-300">
                   <div className="mt-20 hidden lg:mt-0 pl-4 pt-4 lg:pt-0 lg:flex">Admin</div>
               </div>
            <div className="pt-4 flex flex-col gap-1">
                {
                    adminMenu.map((menu) =>{
                        return (
                            <div key={menu.id} className="flex items-center text-sm gap-1">
                                {
                                    menu.children &&  menu.children.length > 0  ?
                                        (
                                            <div className="w-full">
                                                {
                                                    <div>
                                                        <div className="flex items-center">
                                                            <div className={`bg-blue-700 h-4 w-[4px] rounded-2xl ml-[0.5px]`}></div>
                                                            <button onClick={()=>toggleSubmenu(menu.id)} className={cn("flex justify-between w-full py-1 px-3")}>
                                                                <div className="flex items-center gap-2"><span className="">{menu.icon}</span>{menu.title}<span></span> </div>
                                                                <div className={"flex items-center"}><ChevronDown size={16}/></div>
                                                            </button>
                                                        </div>
                                                        <div>
                                                        </div>
                                                        {openSubmenuId.includes(menu.id) && menu.children.map((child: MenuItem) => {
                                                            return (
                                                                    <Link key={child.id} className={cn("ml-4 relative flex items-center gap-2 mt-1 px-2 py-1")} to={child.path}>
                                                                        <span className="">{child.icon}</span>
                                                                        {child.title}
                                                                    </Link>
                                                            )
                                                        })
                                                        }
                                                    </div>
                                                }
                                            </div>
                                        ) :
                                        (
                                            <div className="flex items-center hover:bg-green-200 w-full">
                                                <div className={`bg-blue-700 h-4 w-[4px] rounded-2xl ml-[0.5px]`}></div>
                                                <Link to={`${menu.path}`} className={cn("flex justify-between w-full py-2 px-3")}>
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
    )
}