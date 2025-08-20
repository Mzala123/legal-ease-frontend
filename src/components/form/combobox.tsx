import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Popover} from "@radix-ui/react-popover";
import {PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/utils.ts";
import {InputHTMLAttributes} from "react";
import {Control, FieldValues, Path} from "react-hook-form";
import {Option} from "@/lib/utils.ts";


interface FieldProps extends InputHTMLAttributes<HTMLSelectElement> {
    label?: string;
    isRequired?: boolean;
    description?: string;
    options: Option[];
}

export default function Combobox<T extends FieldValues> ({control, label, description, isRequired=false, ...props}:
{
    name: Path<T>;
    control: Control<T>;
} & FieldProps ) {

    return (
        <FormField
            control={control}
            name={props.name}
            disabled={props.disabled}
            render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                    <FormLabel>{label} {isRequired && <span className="text-destructive">*</span>} </FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between border border-stone-800",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? props.options.find(
                                            (option) => option.value === field.value
                                        )?.label
                                        : "Select "+label}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0" align="end">
                            <Command className="relative">
                                <CommandInput
                                    placeholder={"Search for a "+label}
                                    className="h-9 focus:ring-0 focus:outline-none placeholder:placeholder-stone-500"
                                />
                                <CommandList>
                                    <CommandEmpty>No {label} found</CommandEmpty>
                                    <CommandGroup>
                                        {props.options.map((option) => (
                                            <CommandItem
                                                value={option.label}
                                                key={option.value.toString()}
                                                onSelect={() => {
                                                   field.onChange(option.value)
                                                }}
                                            >
                                                {option.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        option.value === field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}