import {
    Bell,
    CircleHelp,
    ExternalLink, HelpCircle,
    LogOut, PanelBottomClose, PanelTopClose, Search,
    Settings,
    User
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {cn} from "@/utils.ts";

import {Input} from "@/components/ui/input.tsx";

type AppBarProps = {
    onToggleMenu: () => void,
    isOpen : boolean,
}

export default function Appbar({onToggleMenu, isOpen}: AppBarProps) {

    return (
        <div className={cn("bg-white flex justify-between h-12 py-2 px-4 border-b border-stone-300 fixed z-20  w-full transition-all ease-in-out", isOpen && "lg:w-[calc(100%-256px)]")}>
            <div className="flex items-center gap-2">
                <div>
                    {!isOpen ? <PanelTopClose size={20} strokeWidth={2} onClick={onToggleMenu} className="cursor-pointer rotate-90 "/>
                        : <PanelBottomClose size={20} strokeWidth={2} onClick={onToggleMenu} className="cursor-pointer rotate-90"/> }
                </div>
                <div>
                    {/*legalEase*/}
                </div>
            </div>
            <div className="flex items-center">
                <div className={"relative flex items-center"}>
                    <Search strokeWidth={2} size={18} className={cn("absolute ml-2 stroke-stone-600")}/>
                    <Input name={"search"} placeholder="Search" onFocus={()=>{}} className={cn("h-8 pl-8 lg:w-[420px] 2xl:w-[620px]",)}></Input>
                </div>

            </div>
            <div className="flex items-center relative gap-2">
                <div className="flex items-center gap-1">
                    <div className="flex justify-center items-center gap-2 size-8 cursor-pointer p-1 hover:bg-stone-100  hover:rounded-sm">
                        <Bell size={18} strokeWidth={2} className=""/>
                    </div>
                    <div className="flex justify-center items-center gap-2 size-8 cursor-pointer p-1 hover:bg-stone-100  hover:rounded-sm">
                        <HelpCircle size={18} strokeWidth={2} className=""/>
                    </div>
                    <div className="flex justify-center items-center gap-2 size-8 cursor-pointer p-1 hover:bg-stone-100  hover:rounded-sm">
                        <Settings size={18} strokeWidth={2} className=""/>
                    </div>
                </div>
                {/*<div className="w-0.5 bg-stone-300 h-4"></div>*/}
                <div className="">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-1 cursor-pointer p-1 hover:bg-stone-100  hover:rounded-3xl">
                                <div className="flex justify-center items-center bg-destructive rounded-full border-stone-300 size-7 shadow-none">
                                    <span className="text-xs font-Poppins_Semibold text-white text-center">MJ</span>
                                </div>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="relative right-2 lg:right-4">
                            <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                                <User size={18}/>
                                <div>Profile</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <Settings size={18}/>
                                <div>Settings</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center justify-between gap-2 w-56">
                                <div className="flex items-center gap-2">
                                    <CircleHelp size={18} />
                                    <div>Help</div>
                                </div>
                                <ExternalLink size={18}/>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2">
                                <LogOut size={18}/>
                                <div>Logout</div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

            </div>
        </div>
    )
}
