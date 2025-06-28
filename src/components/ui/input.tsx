import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        return (
            <div className={cn("flex flex-col gap-1")}>
                <input
                    ref={ref}
                    type={type}
                    name={props.name}
                    data-slot="input"
                    className={cn(
                        "border placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 " +
                        "dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex min-h-9 w-full " +
                        "rounded border bg-transparent px-2 py-1 text-sm shadow-sm transition-[color,box-shadow] outline-none focus-visible:ring-2 " +
                        "disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
                        className
                    )}
                    {...props}
                />
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }



// import * as React from "react"
//
// import { cn } from "@/lib/utils.ts"
//
// const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
//     ({ className, type, ...props }, ref) => {
//         return (
//             <div className={cn('flex flex-col gap-1')}>
//                 <input
//                     type={type}
//                     className={cn(
//                         "flex h-9 w-full rounded border bg-transparent px-2 py-1 shadow-sm text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-accent-foreground " +
//                         "focus-visible:outline focus:outline-border " +
//                         "focus-visible:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
//                         className
//                     )}
//                     ref={ref}
//                     name={props.name}
//                     {...props}
//                 />
//             </div>
//
//         )
//     }
// )
// Input.displayName = "Input"
//
// export { Input }
