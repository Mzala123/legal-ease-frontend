import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form
} from "@/components/ui/form.tsx";
import {cn} from "@/utils.ts";
import InputField from "@/components/form/input-field.tsx";
import {Button} from "@/components/ui/button.tsx";



const formSchema = z.object({
    email: z.string().email().min(1, {
        message: "Username is required",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters"
    }),
})

export function Login() {

    const form =  useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values  )
    }

    return (
        <div className={cn('w-full h-screen flex flex-col')}>
                <div className={cn('mt-8')}>
                    <div className={cn('container mx-auto')}>
                            <h1 className={cn("text-2xl font-bold")}>LegalEase</h1>
                    </div>
                </div>
                <div className={cn('w-full mx-auto px-2 flex flex-col flex-1 gap-8 justify-center items-center')}>
                    <div className={cn('flex items-left')}>
                        <h1 className={cn("text-3xl text-left font-bold")}>Sign In</h1>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-4 w-96')}>
                            <InputField
                                name="email"
                                control={form.control}
                                label="Email"
                                type="email"
                                placeholder="Enter your username"
                                isRequired={true}
                            />
                            <InputField
                                name="password"
                                control={form.control}
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                isRequired={true}
                            />
                            <Button type="submit" className={cn("w-full font-bold")}>Sign In</Button>
                        </form>
                    </Form>
                </div>
                <div className={cn('flex container mx-auto mb-5 h-20')}>
                    {/*hello*/}
                </div>
        </div>
    )
}