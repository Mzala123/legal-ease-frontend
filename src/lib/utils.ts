import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isPrimaryKey(key: string | "+" | undefined) {
    return key && key !== "+" ? key : false;
}

export type Option = {
    value: string | number | boolean,
    label: string,
    disabled?: boolean
}