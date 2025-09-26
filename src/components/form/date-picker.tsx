import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Control, FieldValues, Path} from "react-hook-form";
import {InputHTMLAttributes} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar.tsx";


// import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    isRequired?: boolean,
}

export default function DateField<T extends FieldValues>({control, label, isRequired = false, ...props}: {
    name: Path<T>,
    control: Control<T>
} & FieldProps) {
    return <FormField
        control={control}
        name={props.name}
        disabled={props.disabled}
        render={({field}) => (
            <FormItem>
                <FormLabel>{label}{' '}{isRequired && <span className="font-bold text-red-500">*</span>}</FormLabel>
                <Popover>
                    <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                                disabled={field.disabled}
                                variant={"outline"}
                                className={cn(
                                    "w-full pl-3 text-left font-normal border-stone-800 border",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                {field.value ? (
                                    format(field.value, "d MMMM, yyy")
                                ) : (
                                    <span>{props.placeholder}</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                            </Button>
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            defaultMonth={field.value}
                            captionLayout="dropdown"
                        />
                    </PopoverContent>
                </Popover>
                <FormMessage className={'text-xs'}/>
            </FormItem>
        )}
    />
}