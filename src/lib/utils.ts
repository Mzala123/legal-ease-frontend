import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isPrimaryKey(key: number | "+" | undefined) {
    return key && key !== "+" ? key : false;
}



