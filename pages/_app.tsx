import "../globals.css";
import { Toaster } from "react-hot-toast";
import { Provider as SupabaseProvider } from "react-supabase";
import type { AppProps } from "next/app";
import useIsClient from "@hooks/useClient";
import { supabaseClient } from "@lib/supebase";

export default function App({ Component, pageProps }: AppProps) {
  const isClient = useIsClient();

  return (
    <SupabaseProvider value={supabaseClient}>
      {isClient && <Toaster />}
      <Component {...pageProps} />
    </SupabaseProvider>
  );
}
