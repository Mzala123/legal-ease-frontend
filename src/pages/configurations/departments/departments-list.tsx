import {DataType} from "ka-table";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {deleteDepartment, getDepartmentList} from "@/services/endpoints.ts";
import {toast} from "sonner";
import {cn} from "@/utils.ts";
import DataTable from "@/components/data-table.tsx";
import {Pencil, Plus, Trash2} from "lucide-react";
import {confirmDialog} from "@/components/dialog";
import {Button} from "@/components/ui/button.tsx";


const columns = [
    {key:"department_name", title: "Department name", dataType: DataType.String, width: 100},
    {key:"department_code", title: "Department Code", dataType: DataType.Date, width: 100},
]

export default function DepartmentsList() {

    const navigate = useNavigate();


    const{data: departments, isLoading, isFetching, refetch } = useQuery({
        queryKey: ["department_id"],
        enabled: true,
        queryFn: ()=>getDepartmentList().then((response)=>{
            return response.data;
        }).catch((err)=>{
            if(!err.response){
                toast.error("Server not running or cannot be reached");
            }else{
                toast.error(err.response?.data?.message || "An unexpected error occurred.");
            }
        })
    });

    console.log(departments)

     return (
         <div className={cn("flex flex-col gap-4 mx-auto w-full h-full lg:w-[80%] 2xl:w-[60%]")}>
             <div className={cn("flex flex-col gap-4 text-sm w-full h-full")}>
                 <div className="text-stone-500">
                     Breadcrumb / Configurations / Case category
                 </div>
                 <div className={cn("flex flex-col gap-4 w-full h-auto")}>
                     <DataTable
                         title={"Departments"}
                         rows={departments || []}
                         columns={columns}
                         primaryKey={"department_id"}
                         isLoading={isLoading}
                         isFetching={isFetching}
                         actions={[
                             {
                                 label: "Edit",
                                 icon: Pencil,
                                 className: "text-sm cursor-pointer gap-1",
                                 onClick: (cell)=>{
                                     navigate(`/home/configurations/departments/${cell.rowData.department_id}`);
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
                                         deleteDepartment(cell.rowData.department_id).then((response)=>{
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
                                 navigate("/home/configurations/departments/+");
                             }}>
                                 <Plus/>
                                 <span>Departments</span>
                             </Button>
                         </div>
                     </DataTable>
                 </div>
             </div>
         </div>
     )
}