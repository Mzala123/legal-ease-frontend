
type SideBarProps = {
    isOpen: boolean
    // onToggleMenu: () => void
}

export default function Sidebar({isOpen}: SideBarProps) {

    return (
        <div className={`fixed z-10 min-w-72 w-72 shadow-md border-r h-full transition-all ease-in-out bg-white border-stone-300 ${isOpen ? "0" :"-left-72"} lg:shadow-none`}>
               <div className="h-16 flex items-center justify-between border-b border-stone-300">
                   <div className="mt-20 lg:mt-0 pl-4 pt-4 lg:pt-0">Admin</div>
               </div>

        </div>
    )
}