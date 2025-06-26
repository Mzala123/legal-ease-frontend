import {cn} from "@/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";

function CaseCategory(){

    const navigate = useNavigate();


    return (
        <div className={cn("flex flex-col gap-4")}>
            <div className={cn("flex flex-col gap-2 text-sm")}>
                <div>
                    Breadcrumb / Configurations / Case category
                </div>
                <div className={cn("flex flex-col gap-4")}>
                    <div className={cn("flex justify-between")}>
                        <div className={"flex items-center"}>
                            <h2 className="text-lg font-Poppins_Semibold">Case Categories</h2>
                        </div>
                        <div>
                            <Button className={cn("")} onClick={()=>{
                                navigate("+");
                            }}>
                                <Plus/>
                                <span>Case category</span>
                            </Button>
                        </div>
                    </div>
                    <div className={cn("flex text-sm bg-green-300")}>
                        table here
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CaseCategory;