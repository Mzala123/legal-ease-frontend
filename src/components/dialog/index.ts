import {confirmable, createConfirmation} from "react-confirm";
import DialogAlert from "@/components/dialog/dialog-alert.tsx";


export const confirmDialog =  createConfirmation(confirmable(DialogAlert))