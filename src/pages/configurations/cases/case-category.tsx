import {cn} from "@/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import {useNavigate} from "react-router-dom";
import DataTable from "@/components/data-table.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllCaseCategories} from "@/services/endpoints.ts";
import {DataType} from "ka-table";


const columns = [
    {key:"category_name", title: "Category name", dataType: DataType.String,},
    {key:"category_code", title: "Category code", dataType: DataType.String,},
    {key:"category_description", title: "Category description", dataType: DataType.String}
]

function CaseCategory(){

    const navigate = useNavigate();

    const{data: caseCategories, isLoading} =  useQuery({
        queryKey: ["category_id"],
        enabled: true,
        queryFn: ()=> getAllCaseCategories().then(({data})=> data),
    })

    console.log(caseCategories);
    console.log(isLoading);

    return (
        <div className={cn("flex flex-col gap-4 mx-auto lg:w-[80%] 2xl:w-[60%]")}>
            <div className={cn("flex flex-col gap-2 text-sm")}>
                <div className="text-stone-500">
                    Breadcrumb / Configurations / Case category
                </div>
                <div className={cn("flex flex-col gap-6")}>
                    <div className={cn("flex justify-between")}>
                        <div className={"flex items-end"}>
                            <h2 className="text-lg font-Poppins_Semibold">Case Categories</h2>
                        </div>
                        <div>
                            <Button className={cn("")} onClick={()=>{
                                navigate("/");
                            }}>
                            <Plus/>
                            <span>Case category</span>
                            </Button>
                        </div>
                    </div>
                    <div className={cn("flex")}>
                       <DataTable
                          data={caseCategories ?? []}
                          columns={columns}
                          rowKeyField={"category_id"}
                          loading={{enabled: false}}
                       />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CaseCategory;