import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {RouterProvider} from "react-router-dom";
import routes from "./routes/Router.tsx";
import {Toaster} from "sonner";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}></RouterProvider>
        <Toaster richColors={true}></Toaster>
    </QueryClientProvider>
  </StrictMode>,
)
