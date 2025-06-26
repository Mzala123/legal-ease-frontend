import {useParams} from "react-router-dom";
import {cn, isPrimaryKey} from "@/lib/utils.ts";
//import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import InputField from "@/components/form/input-field.tsx";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Info} from "lucide-react";



const formSchema = z.object({
    category_name: z.string().trim().min(1,{message: "Case category name is required"}),
    category_code: z.string({message: "Case category code should be a string"}).trim(),
    case_description: z.string().trim().min(1, {message: "Case category description is required"}),
})

function CaseCategoryCreate() {

    const  params = useParams();
    const primaryKey = isPrimaryKey(params.case_id as unknown as number);



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            category_name: "",
            category_code: "",
            case_description: ""
        }
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }


    return (
        <div className={cn("")}>
            <div className={cn("flex flex-col gap-4 text-sm mx-auto lg:w-[80%] 2xl:w-[65%] ")}>
                <div className={cn("flex items-end")}>
                    <p>Breadcrumb / Configurations / Case category</p>
                </div>
                <div className={cn("flex flex-col gap-3")}>
                    <div className={cn("flex gap-4 items-end")}>
                        {/*<Button className={cn("bg-accent text-black")}>Back</Button>*/}
                        <h2 className="text-xl font-Poppins_Semibold text-stone-800">
                            {primaryKey ? "Edit" : "Case Category Add"}
                        </h2>
                    </div>
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

                            <InputField
                                name="case_description"
                                control={form.control}
                                label="Category description"
                                type="text"
                                placeholder=""
                                isRequired={true}
                            />

                            <div>
                                <Button
                                    type={"submit"}
                                    disabled={!form.formState.isValid || !form.formState.isDirty}
                                    className={cn("font-Poppins_Semibold", (!form.formState.isValid || !form.formState.isDirty) && "bg-accent text-stone-400 cursor-not-allowed")}
                                >
                                    Save
                                </Button>
                            </div>

                            </form>
                        </Form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CaseCategoryCreate;