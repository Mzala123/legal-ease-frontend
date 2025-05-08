import {useState} from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "@/components/wireframe/Sidebar.tsx";
import Appbar from "@/components/wireframe/Appbar.tsx";

function Layout() {

    const[isOpen, setIsOpen] = useState<boolean>(true)

    function handleToggleMenu() {
        setIsOpen(!isOpen)
        console.log(isOpen)
    }

    // function handleCloseMenu() {
    //     setIsOpen(false)
    // }

    return (
        <div className={`flex h-screen w-full bg-stone-100`}>
            {
                isOpen &&
                (<div className={`transition-all ease-in-out`}>
                    <Sidebar isOpen={isOpen}/>
                </div>)
            }

              <div className={`flex flex-col w-full relative transition-all ease-in-out ${isOpen ? "lg:ml-72" : ""}`}>
                 <Appbar onToggleMenu={handleToggleMenu} isOpen={isOpen}/>
                 <div className="bg-white justify-center mt-20 mx-4 mb-4 flex-1 border transition-all ease-in-out border-stone-300 rounded-lg">
                     hie
                    <Outlet/>
                </div>
             </div>

        </div>
    )
}

export default Layout;