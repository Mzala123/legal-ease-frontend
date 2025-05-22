import * as React from "react"

import { cn } from "@/lib/utils.ts"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className={cn('flex flex-col gap-1')}>
                <input
                    type={type}
                    className={cn(
                        "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-accent-foreground " +
                        "focus-visible:outline focus:outline-border " +
                        "focus-visible:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
Input.displayName = "Input"

export { Input }
