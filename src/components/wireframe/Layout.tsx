import {useEffect, useRef, useState} from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "@/components/wireframe/Sidebar.tsx";
import Appbar from "@/components/wireframe/Appbar.tsx";
import {cn} from "@/utils.ts";


function Layout() {

    const[isOpen, setIsOpen] = useState<boolean>(true)
    const sideBarRef = useRef<HTMLDivElement | null>(null);

    function handleToggleMenu() {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    function handleClickAway(e: MouseEvent) {
        if(sideBarRef.current && e.target instanceof Node && !sideBarRef.current.contains(e.target)){
            setIsOpen(false)
        }
    }

    useEffect(() => {
        if(isOpen) {
            document.addEventListener("mousedown", handleClickAway);
        }else{
            document.removeEventListener("mousedown", handleClickAway);
        }
    }, [isOpen])

    return (
        <div className={`flex h-screen w-full bg-white`}>
                <div className={`transition-all ease-in-out h-screen`}>
                    <Sidebar isOpen={isOpen}/>
                </div>
              <div className={cn(`flex flex-col w-full relative transition-all ease-in-out`, isOpen && "lg:ml-64")}>
                 <Appbar onToggleMenu={handleToggleMenu} isOpen={isOpen}/>
                 <div className="justify-center mt-16 mx-4 mb-4 flex-1 transition-all overflow-y-auto ease-in-out">
                    <Outlet/>
                </div>
             </div>

        </div>
    )
}

export default Layout;