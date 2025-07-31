import {ConfirmDialog} from "react-confirm";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx";


type AlertProps = {
    title?: string;
    description?: string;
    cancelText?: string;
    confirmText?: string;
    open?: boolean
}

const DialogAlert: ConfirmDialog<AlertProps, boolean> = ({
        title= "Are you absolutely sure?",
        description,
        cancelText="Cancel",
        confirmText="Continue",
        ...props
        }
) => {

    return (
        <AlertDialog open={props.show} onOpenChange={(open)=> !open && props.dismiss()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={props.dismiss}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction className="text-black" onClick={()=> props.proceed(true)}>{confirmText}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

}

export default DialogAlert;