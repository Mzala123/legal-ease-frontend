import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Control, FieldValues, Path} from "react-hook-form";
import {InputHTMLAttributes} from "react";
import {Input} from "@/components/ui/input.tsx";
import {cn} from "@/utils.ts";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    isRequired?: boolean,
    description?: string,
}


export default function InputField<T extends FieldValues>({control, label, isRequired=false, ...props} : {
    name: Path<T>,
    control: Control<T>;
} & FieldProps) {
    return (
        <FormField
            control={control}
            name={props.name}
            render={({field})=> (
                <FormItem className="">
                  <FormLabel className={cn("font-Poppins_Semibold text-stone-800 text-xs")}>{label}{" "}{isRequired && <span className="font-bold text-destructive">*</span>} </FormLabel>
                    <FormControl>
                        <Input {...props} {...field} onChange={({target})=>{
                            if(props.type === "number") {
                                field.onChange(Number(target.value) || target.value)
                            }else {
                                field.onChange(target.value)
                            }
                        }}>
                        </Input>
                    </FormControl>
                    <FormDescription className="text-xs">{props.description}</FormDescription>
                    <FormMessage className={'text-xs'}/>
                </FormItem>
            )}
        >
        </FormField>
    )
}