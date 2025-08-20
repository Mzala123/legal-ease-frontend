import {cn} from "@/utils.ts";
import {Button} from "@/components/ui/button.tsx";
import {Eye, Pencil, Plus, Trash2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import DataTable from "@/components/data-table.tsx";
import {useQuery} from "@tanstack/react-query";
import {deleteOneCaseCategory, getAllCaseCategories} from "@/services/endpoints.ts";
import {DataType} from "ka-table";
import {confirmDialog} from "@/components/dialog";
import {toast} from "sonner";


const columns = [
    {key:"category_name", title: "Category name", dataType: DataType.String, width: 100},
    {key:"category_code", title: "Category code", dataType: DataType.String, width: 100},
]

function CaseCategory(){

    const navigate = useNavigate();

    const{data: caseCategories, isLoading, isFetching, refetch} =  useQuery({
        queryKey: ["category_id"],
        enabled: true,
        queryFn: ()=> getAllCaseCategories().then(({data})=> data),
    })

    return (
        <div className={cn("flex flex-col gap-4 mx-auto w-full h-full lg:w-[80%] 2xl:w-[60%]")}>
            <div className={cn("flex flex-col gap-4 text-sm w-full h-full")}>
                <div className="text-stone-500">
                    Breadcrumb / Configurations / Case category
                </div>
                <div className={cn("flex flex-col gap-4 w-full h-auto")}>
                        <DataTable
                            title={"Case Categories"}
                            rows={caseCategories || []}
                            columns={columns}
                            primaryKey={"category_id"}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            actions={[
                                {
                                    label: "View",
                                    icon: Eye,
                                    className: "text-sm cursor-pointer gap-1",
                                    onClick: (cell)=>{
                                        console.log(cell.rowData.category_id
                                        );
                                       // navigate(`/home/configurations/case-category/${cell.rowData.category_id}`);
                                    }
                                },
                                {
                                    label: "Edit",
                                    icon: Pencil,
                                    className: "text-sm cursor-pointer gap-1",
                                    onClick: (cell)=>{
                                        console.log(cell.rowData.category_id
                                        );
                                      navigate(`/home/configurations/case-category/${cell.rowData.category_id}`);
                                    }
                                },
                                {
                                    label: "Delete",
                                    icon: Trash2,
                                    className: "text-sm cursor-pointer gap-1 text-destructive",
                                    onClick: (cell )=>{
                                        confirmDialog({
                                            title: "Are you absolutely sure?",
                                            description: "Deleting removes this record in its entirety",
                                            confirmText: "Confirm",
                                            cancelText: "Cancel",
                                        }).then(() => {
                                            deleteOneCaseCategory(cell.rowData.category_id).then((response)=>{
                                                toast.success(response.data.message);
                                                refetch();
                                            }).catch(err=>{
                                                toast.error(err.response?.data?.message || "An unexpected error occurred.");
                                            })
                                        }).catch(err => {
                                            toast.error(err.message);
                                        })

                                    }
                                }
                            ]}
                        >
                            <div>
                                <Button className={cn("")} onClick={()=>{
                                    navigate("/home/configurations/case-category/+");
                                }}>
                                    <Plus/>
                                    <span>Case category</span>
                                </Button>
                            </div>
                        </DataTable>
                </div>
            </div>
        </div>
    )
}

export default CaseCategory;