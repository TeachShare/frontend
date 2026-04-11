"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // We use useState to ensure the QueryClient is only created once per user session,
  // preventing it from being recreated during React re-renders.
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* This adds a little widget in the corner of your dev environment to see your data */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
