import {z} from "zod";
import {cn, isPrimaryKey} from "@/lib/utils.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {createFinancialYear, getOneFinancialYear, updateFinancialYear} from "@/services/endpoints.ts";
import {toast} from "sonner";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, Info} from "lucide-react";
import PageLoader from "@/components/ui/page-loader.tsx";
import {Form} from "@/components/ui/form.tsx";
import InputField from "@/components/form/input-field.tsx";



const formSchema = z.object({
    name: z.string().trim().min(1, {message: 'Financial year name is required'}),
    start_date: z.coerce.date({required_error: "Start date is required"}),
    end_date: z.coerce.date({required_error: "End date is required"}),
}).refine(data => data.end_date >= data.start_date,
    {
        path: ['end_date'],
        message: 'End date is cannot be before start date',
    }
);


export default function FinancialYearAdd(){

    const params = useParams();
    const primaryKey = isPrimaryKey(params.financial_year_id as unknown as string);
    const financial_year_id = params.financial_year_id;
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            start_date:  undefined,
            end_date:  undefined
        }
    })

    const {isLoading, isFetching} = useQuery({
        queryKey: ["case-category",primaryKey],
        enabled: !!primaryKey,
        queryFn: () => getOneFinancialYear(financial_year_id as unknown as string).then(({data}) =>{
            form.reset({
                name: data.name,
                start_date: data.start_date,
                end_date: data.end_date,
            });
            return data;
        }).catch((error)=>{
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
        }),
    })

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values)
        return
         if(primaryKey){
             setLoading(true);
             updateFinancialYear(financial_year_id as unknown as string,  values).then(({data}) => {
                 toast.success(data.message);
                 navigate(-1)
             }).catch((error)=>{
                 toast.error(error.response?.data?.message || "An unexpected error occurred.");
             }).finally(()=>{
                 setLoading(false);
             })
         }else{
             setLoading(true);
             createFinancialYear(values).then(({data}) => {
                 toast.success(data.message);
                 navigate(-1)
             }).catch((error)=>{
                 toast.error(error.response?.data?.message || "An unexpected error occurred.");
             }).finally(()=>{
                 setLoading(false);
             })
         }
    }

    return (
        <div className={cn("")}>
            <div className={cn("flex flex-col gap-4 text-sm mx-auto lg:w-[80%] 2xl:w-[60%]")}>
                <div className={cn("flex items-end")}>
                    <p className={"mt-2 text-stone-500"}>Breadcrumb / Configurations / Case category</p>
                </div>
                <div className={cn("flex flex-col gap-3")}>
                    <div className={cn("flex gap-2 items-center")}>
                        <Button className="p-1 rounded-full size-8 bg-accent hover:bg-stone-100" onClick={()=>navigate(-1)}> <ArrowLeft size={18} /></Button>
                        <h2 className="text-xl font-Poppins_Semibold text-stone-700">
                            {primaryKey ? "Update financial year" : "New financial year"}
                        </h2>
                    </div>
                    {
                        ( (isFetching || isFetching)  ? <PageLoader loading={isLoading}/> :
                                <div className={cn("flex justify-center mt-6")}>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6 w-[400px]")}>
                                            <div className={cn("flex flex-col gap-2")}>
                                                <p className="text-sm flex gap-1 items-center">
                                                    <span><Info size={16} className={"stroke-primary"}/></span>
                                                    <span>Financial year instances include 2024/2025.</span>
                                                </p>
                                                <p className="text-xs">Required fields are marked with an asterisk  <span className="text-destructive">*</span></p>
                                            </div>
                                            <InputField
                                                name="name"
                                                control={form.control}
                                                label="Financial year name"
                                                type="text"
                                                placeholder=""
                                                isRequired={true}
                                                className={cn("w-full")}
                                            />
                                            <div>

                                                {/*<DatepickerField*/}
                                                {/*    name="start_date"*/}
                                                {/*    control={form.control}*/}
                                                {/*    isRequired={false}*/}
                                                {/*    className={cn("")}*/}
                                                {/*    label="Start date"*/}
                                                {/*/>*/}
                                                {/*<DatepickerField*/}
                                                {/*    name="end_date"*/}
                                                {/*    control={form.control}*/}
                                                {/*    isRequired={false}*/}
                                                {/*    className={cn("")}*/}
                                                {/*    label="End date"*/}
                                                {/*/>*/}
                                            </div>

                                            <div>
                                                <Button
                                                    type={"submit"}
                                                //     disabled={!form.formState.isValid || !form.formState.isDirty}
                                                //     className={cn("font-Poppins_Semibold flex gap-0", (!form.formState.isValid || !form.formState.isDirty) && "bg-accent text-stone-400 cursor-not-allowed")}
                                                >
                                                    {loading ? <PageLoader> Saving... </PageLoader>  :  <span> Save</span>}
                                                </Button>
                                            </div>

                                        </form>
                                    </Form>
                                </div>
                        )
                    }

                </div>
            </div>

        </div>
    )
}