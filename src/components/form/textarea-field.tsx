import {cn} from "@/lib/utils.ts";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {TextareaHTMLAttributes} from "react";
import {Control, FieldValues, Path} from "react-hook-form";


interface FieldProps<T extends FieldValues> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string,
    isRequired?: boolean,
    description?: string,
    name: Path<T>,
    control: Control<T>,
}


function TextareaField<T extends FieldValues>({control, label, isRequired=false, description, ...props}: FieldProps<T>) {
      return (

          <div className={cn("")}>
              <FormField
                  control={control}
                  name={props.name}
                  render={({field}) => (
                      <FormItem>
                          <FormLabel>
                              {label}
                              {isRequired && <span className={"text-destructive ml"}>*</span>}
                          </FormLabel>
                          <FormControl>
                              <Textarea
                                  placeholder={""}
                                  className={"resize-none"}
                                  {...field}
                                  rows={props.rows ?? 4}
                              >
                              </Textarea>
                          </FormControl>
                          <FormDescription className={"text-xs"}>{description}</FormDescription>
                          <FormMessage className={"text-xs"}></FormMessage>
                      </FormItem>
                  )}
              />
          </div>
      )
}

export default  TextareaField;