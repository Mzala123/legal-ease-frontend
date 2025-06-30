import {useNavigate, useParams} from "react-router-dom";
import {cn, isPrimaryKey} from "@/lib/utils.ts";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/form/input-field.tsx";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, Info} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {createCaseCategory, getOneCaseCategory, updateCaseCategory} from "@/services/endpoints.ts";
import PageLoader from "@/components/ui/page-loader.tsx";
import TextareaField from "@/components/form/textarea-field.tsx";
import {toast} from "sonner";
import {useState} from "react";
import {Input} from "@/components/ui/input.tsx";



const formSchema = z.object({
    category_name: z.string().trim().min(1,{message: "Case category name is required"}),
    category_code: z.string({message: "Case category code should be a string"}).trim(),
    category_description: z.string().trim().min(1, {message: "Case category description is required"}),
})

function CaseCategoryCreate() {

    const  params = useParams();
    const primaryKey = isPrimaryKey(params.case_id as unknown as string);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category_name: "",
            category_code:  "",
            category_description:  ""
        }
    })

    const {isLoading, isFetching} = useQuery({
        queryKey: ["case-category",primaryKey],
        enabled: !!primaryKey,
        queryFn: () => getOneCaseCategory(params.case_id as unknown as string).then(({data}) =>{
            form.reset({
                category_name: data.category_name,
                category_code: data.category_code,
                category_description: data.category_description
            });
            return data;
        }),
    })


    // console.log(caseCategory)

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        if (primaryKey) {
            setLoading(!loading);
            updateCaseCategory(params.case_id as unknown as string, values).then(({data}) =>{
                toast.success(data.message);
                navigate(-1);
            }).catch(error => {
                toast.error(error.message);
            }).finally(()=>{
                setLoading(false);
            })
        }else{
            setLoading(!loading);
            createCaseCategory(values).then((response) => {
                toast.success(response.data.message);
                navigate(-1);
            }).catch(error => {
                toast.error(error.response?.data?.message || "An unexpected error occurred.");
                console.log(error)
            }).finally(()=>{
                form.reset({
                    category_name: "",
                    category_code: "",
                    category_description:""
                })
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
                            {primaryKey ? "Update category edit" : "New case category"}
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
                                                <span>Case categories instances include crime, civil.</span>
                                            </p>
                                            <p className="text-xs">Required fields are marked with an asterisk  <span className="text-destructive">*</span></p>
                                        </div>
                                        <InputField
                                            name="category_name"
                                            control={form.control}
                                            label="Category name"
                                            type="text"
                                            placeholder=""
                                            isRequired={true}
                                            className={cn("w-full")}
                                        />

                                        <InputField
                                            name="category_code"
                                            control={form.control}
                                            label="Category code"
                                            type="text"
                                            placeholder=""
                                            className={cn("w-full")}
                                        />

                                        <TextareaField
                                            name="category_description"
                                            control={form.control}
                                            label="Category description"
                                            placeholder=""
                                            isRequired={true}
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

export default CaseCategoryCreate;