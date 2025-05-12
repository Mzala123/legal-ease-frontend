import * as React from "react"

import { cn } from "@/lib/utils"

const InputField = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className={cn('flex flex-col gap-1')}>
                <label htmlFor={props.name}>{props.placeholder}</label>
                <input
                    type={type}
                    className={cn(
                        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        className
                    )}
                    ref={ref}
                    name={props.name}
                    {...props}
                />
            </div>

        )
    }
)
InputField.displayName = "Input"

export { InputField }
