import {LoaderCircle} from "lucide-react";
import {cn} from "@/utils.ts";


function PageLoader({...props}) {

return (
    <div className={cn("flex gap-2 justify-center items-center")}>
        <LoaderCircle className="animate-spin" stroke={"gray"} size={24}/> <span className={cn("text-sm")}> {props.children} </span>
    </div>
  )
}
export default PageLoader;