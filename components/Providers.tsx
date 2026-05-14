"use client"
import { store } from "@/src/srore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux'


type Props = {
    children: React.ReactNode;
};

const queryClient = new QueryClient()

export default function Providers({ children, }: Props) {
    return (

 <QueryClientProvider client={queryClient}>
     {children}
    </QueryClientProvider>
    );
}