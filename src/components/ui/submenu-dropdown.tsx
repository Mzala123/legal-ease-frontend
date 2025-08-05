import {MenuItem} from "@/menus/admin-menu/admin-menu.tsx";
import {cn} from "@/utils.ts";
import {ChevronDown} from "lucide-react";
import {Link, useLocation} from "react-router-dom";
import {useState} from "react";


function SubmenuDropdown({menuList}: {menuList: MenuItem[]}) {
    const location = useLocation();
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
        <div className="flex flex-col gap-1">
            {
                menuList.map((menu) =>{
                    const linkIsActive: boolean =  location.pathname === menu.path
                    return (
                        <div key={menu.id} className="flex items-center text-sm gap-1">
                            {
                                menu.children &&  menu.children.length > 0  ?
                                    (
                                        <div className="w-full">
                                            {
                                                <div>
                                                    <div className="flex items-center w-full hover:bg-stone-100 hover:text-primary">
                                                        <div className={cn(`bg-transparent h-4 w-[3px] rounded-2xl ml-[0.5px]`, "")}></div>
                                                        <button onClick={()=>toggleSubmenu(menu.id)} className={cn("flex justify-between w-full py-[6px] px-3 ")}>
                                                            <div className="flex items-center gap-2"><span className="">{menu.icon}</span>{menu.title}<span></span> </div>
                                                            <div className={"flex items-center "}><ChevronDown className={cn("transition-transform duration-100", openSubmenuId.includes(menu.id) && "rotate-180")} size={18} strokeWidth={2}/></div>
                                                        </button>
                                                    </div>
                                                    <div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        {openSubmenuId.includes(menu.id) && menu.children.map((child: MenuItem) => {
                                                            const subLinkIsActive: boolean = location.pathname === child.path
                                                            return (
                                                                <Link key={child.id} className={cn("ml-4 relative flex items-center gap-2 mt-1 px-3 py-[6px] hover:rounded-l hover:bg-stone-100 hover:stroke-primary hover:text-primary", subLinkIsActive && "text-primary bg-stone-100 rounded-l")} to={child.path}>
                                                                    <span className={cn(subLinkIsActive && "text-primary stroke-primary")}>{child.icon &&
                                                                        (
                                                                            <child.icon.type {...child.icon.props} className={cn("", subLinkIsActive && "text-primary stroke-primary")} />
                                                                        )
                                                                    }</span>
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
                                        <div className={cn("flex items-center hover:bg-stone-100 hover:text-primary w-full", linkIsActive && "bg-stone-100")}>
                                            <div className={cn(`bg-transparent h-4 w-[3px] rounded-2xl ml-[0.5px] hover:text-primary`,  linkIsActive && "bg-primary")}></div>
                                            <Link to={`${menu.path}`} className={cn("flex justify-between w-full py-[6px] px-3", linkIsActive && "text-primary")}>
                                                <div className="flex items-center gap-2">
                                                    <span className={cn("",linkIsActive && "text-primary")}>{
                                                        menu.icon &&
                                                          (
                                                              <menu.icon.type {...menu.icon.props} className={cn("", linkIsActive && "text-primary stroke-primary")} />
                                                          )
                                                    }</span>
                                                    <span className={cn("",linkIsActive && "text-primary")}>{menu.title}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SubmenuDropdown;