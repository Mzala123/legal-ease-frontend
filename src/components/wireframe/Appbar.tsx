import {Bell, ChevronsUpDown, CircleHelp, ExternalLink, LogOut, PanelLeft, Settings, User} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
// import {Button} from "@/components/ui/button.tsx";

type AppBarProps = {
   onToggleMenu: () => void,
   isOpen : boolean,
}

export default function Appbar({onToggleMenu, isOpen}: AppBarProps) {

    return (
            <div className={`flex justify-between h-16 py-2 px-4 border-b border-stone-300 fixed z-20 bg-white w-full transition-all ease-in-out lg:${isOpen ? "w-[calc(100%-288px)]" : "w-full"}`}>
                <div className="flex items-center gap-2">
                    <div><PanelLeft onClick={onToggleMenu} className="cursor-pointer"/></div>
                    <div>
                        LegalEase
                    </div>
                </div>

                <div className="flex items-center relative gap-2">
                    <div>
                        <div className="flex justify-center items-center gap-2 size-10 cursor-pointer p-1 hover:bg-stone-50  hover:rounded-3xl">
                                <Bell size={28} strokeWidth={2} className=""/>
                        </div>
                    </div>
                    <div className="w-0.5 bg-stone-300 h-4"></div>
                    <div className="">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-stone-50  hover:rounded-3xl">
                                    <div className="flex justify-center items-center rounded-full border bg-stone-50 size-10 hover:bg-white shadow-none">
                                        <User className="stroke-black" size={24}/>
                                    </div>
                                    <span className="text-sm hidden lg:flex">Mtende J</span>
                                    <ChevronsUpDown size={18}/>
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
                                <DropdownMenuItem className="flex items-center justify-between gap-2 lg:w-56">
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

