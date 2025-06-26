
import {Suspense} from "react";
import PageLoader from "@/components/ui/page-loader.tsx";

interface SuspendedPageProps {
    page: React.ReactNode;
}

export default function SuspendedPage({page}: SuspendedPageProps) {
    return (
        <Suspense fallback={<PageLoader/>}>
            {page}
        </Suspense>
    )
}