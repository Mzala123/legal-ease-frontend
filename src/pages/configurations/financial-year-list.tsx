import {DataType} from "ka-table";
import {useQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";
import {deleteFinancialYear, getFinancialYear} from "@/services/endpoints.ts";
import {cn} from "@/utils.ts";
import DataTable from "@/components/data-table";
import {Pencil, Plus, Trash2} from "lucide-react";
import {confirmDialog} from "@/components/dialog";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";



const columns = [
    {key:"name", title: "Financial year name", dataType: DataType.String, width: 100},
    {key:"start_date", title: "Start date", dataType: DataType.Date, width: 100},
    {key:"end_date", title: "End date", dataType: DataType.Date, width: 100},
]

function FinancialYearList(){

    const navigate = useNavigate();

    const{data: financialYear , isFetching, isLoading, refetch}=useQuery({

        queryKey: ['name'],
        enabled: true,
        queryFn: () => getFinancialYear().then((response)=>{
            return response.data;
        }).catch((err)=>{
            if(!err.response){
                toast.error("Server not running or cannot be reached");
            }else{
                toast.error(err.response?.data?.message || "An unexpected error occurred.");
            }

        })
    })

/*
    if(isError){
        return <Alert className="bg-destructive-foreground">
            <TriangleAlert/>
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
                You can add components and dependencies to your app using the cli.
            </AlertDescription>
        </Alert>
    }*/

    console.log(financialYear);

    return (
        <div className={cn("flex flex-col gap-4 mx-auto w-full h-full lg:w-[80%] 2xl:w-[60%]")}>
            <div className={cn("flex flex-col gap-4 text-sm w-full h-full")}>
                <div className="text-stone-500">
                    Breadcrumb / Configurations / Case category
                </div>
                <div className={cn("flex flex-col gap-4 w-full h-auto")}>
                    <DataTable
                        title={"Financial Years"}
                        rows={financialYear || []}
                        columns={columns}
                        primaryKey={"financial_year_id"}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        actions={[
                            {
                                label: "Edit",
                                icon: Pencil,
                                className: "text-sm cursor-pointer gap-1",
                                onClick: (cell)=>{
                                    navigate(`/home/configurations/financial-year/${cell.rowData.financial_year_id}`);
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
                                        deleteFinancialYear(cell.rowData.financial_year_id).then((response)=>{
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
                                navigate("/home/configurations/financial-year/+");
                            }}>
                                <Plus/>
                                <span>Financial year</span>
                            </Button>
                        </div>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}

export default FinancialYearList