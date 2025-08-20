import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {createDepartments, getDepartmentByPk, updateDepartment} from "@/services/endpoints.ts";
import {cn, isPrimaryKey} from "@/lib/utils.ts";
import {z} from "zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, Info} from "lucide-react";
import PageLoader from "@/components/ui/page-loader.tsx";
import {Form} from "@/components/ui/form.tsx";
import InputField from "@/components/form/input-field.tsx";
import TextareaField from "@/components/form/textarea-field.tsx";
import {toast} from "sonner";


const formSchema = z.object({
    department_name: z.string().trim().min(1, {message: 'Department name is required'}),
    department_code: z.string().trim(),
    department_description: z.string().trim(),

})

export default function DepartmentsAdd() {

    const navigate = useNavigate();
    const params = useParams();
    const department_id = params.department_id;
    const primaryKey =  isPrimaryKey(params.department_id as unknown as string)
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            department_name: "",
            department_code:  "",
            department_description:  ""
        }
    })

    const {isLoading, isFetching} = useQuery({
        queryKey: [],
        enabled: !!primaryKey,
        queryFn: ()=> getDepartmentByPk(department_id as string).then(({data})=>{
            form.reset(
                {
                    department_name: data.department_name,
                    department_code: data.department_code,
                    department_description: data.department_description,
                })
            return data
        }).catch((err)=>{
            toast.error(err.response?.data?.message || "An unexpected error occurred.");
        })
    })


    function onSubmit(values: z.infer<typeof formSchema>){
        if(primaryKey){
            setLoading(true);
            updateDepartment(department_id as unknown as string, values).then((response)=>{
                toast.success(response?.data?.message || "Department record created");
                navigate(-1);
            }).catch((err)=>{
                toast.error(err.response?.data?.message || "An unexpected error occurred.");
            }).finally(()=>{
                setLoading(false);
            })
        }else{
            setLoading(true);
            createDepartments(values).then(({data}) => {
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
                                                name="department_name"
                                                control={form.control}
                                                label="Department Name"
                                                type="text"
                                                placeholder=""
                                                isRequired={true}
                                                className={cn("w-full")}
                                            />

                                            <InputField
                                                name="department_code"
                                                control={form.control}
                                                label="Department Code"
                                                type="text"
                                                className={cn("w-full")}
                                            />

                                            <TextareaField
                                                name="department_description"
                                                control={form.control}
                                                label="Department Description"
                                                className={cn("w-full")}
                                            />
                                            <div>
                                                <Button
                                                    type={"submit"}
                                                     disabled={!form.formState.isValid || !form.formState.isDirty}
                                                     className={cn("font-Poppins_Semibold flex gap-0", (!form.formState.isValid || !form.formState.isDirty) && "bg-accent text-stone-400 cursor-not-allowed")}
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
