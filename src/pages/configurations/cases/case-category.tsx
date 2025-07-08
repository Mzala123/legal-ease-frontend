import {cn} from "@/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Pencil, Plus, Trash} from "lucide-react";
import {useNavigate} from "react-router-dom";
import DataTable from "@/components/data-table.tsx";
import {useQuery} from "@tanstack/react-query";
import {getAllCaseCategories} from "@/services/endpoints.ts";
import {DataType} from "ka-table";


const columns = [
    {key:"category_name", title: "Category name", dataType: DataType.String, width: 100},
    {key:"category_code", title: "Category code", dataType: DataType.String, width: 100},
    {key:"category_description", title: "Category description", dataType: DataType.String, width: 300},
]

function CaseCategory(){

    const navigate = useNavigate();

    const{data: caseCategories, isLoading, isFetching} =  useQuery({
        queryKey: ["category_id"],
        enabled: true,
        queryFn: ()=> getAllCaseCategories().then(({data})=> data),
    })

    console.log(caseCategories);
    console.log(isLoading);

    return (
        <div className={cn("flex flex-col gap-4 mx-auto w-full h-full")}>
            <div className={cn("flex flex-col gap-4 text-sm w-full h-full")}>
                <div className="text-stone-500">
                    Breadcrumb / Configurations / Case category
                </div>
                <div className={cn("flex flex-col gap-4 w-full h-full")}>
                    <div className={cn("flex items-center justify-between")}>
                        <div className={"flex items-end"}>
                            <h2 className="text-lg font-Poppins_Semibold">Case Categories</h2>
                        </div>
                        <div>
                            <Button className={cn("")} onClick={()=>{
                                navigate("/home/configurations/case-category/+");
                            }}>
                            <Plus/>
                            <span>Case category</span>
                            </Button>
                        </div>
                    </div>
                    <div className={cn("flex h-full rounded-lg shadow-lg")}>
                        <DataTable
                            title={"Case Categories"}
                            rows={caseCategories || []}
                            columns={columns}
                            primaryKey={"category_id"}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            actions={[
                                {
                                    label: "Edit",
                                    icon: Pencil,
                                    className: "text-sm cursor-pointer gap-1",
                                    onClick: (cell)=>{

                                    }
                                },
                                {
                                    label: "Delete",
                                    icon: Trash,
                                    className: "text-sm cursor-pointer gap-1 text-destructive",
                                    onClick: (cell)=>{

                                    }
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CaseCategory;