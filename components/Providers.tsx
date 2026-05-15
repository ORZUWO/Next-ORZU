"use client"
import { store } from "@/src/srore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

const queryClient = new QueryClient()

export default function Providers({ children, }: Props) {
    return (

 <QueryClientProvider client={queryClient}>
     {children}
    </QueryClientProvider>
    );
}