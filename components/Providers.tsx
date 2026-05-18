"use client"

import { store } from "@/src/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { useState } from "react"

type Props = {
  children: React.ReactNode
}

export default function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  )
}