import "../globals.css";
import { Toaster } from "react-hot-toast";

import type { AppProps } from "next/app";
import useIsClient from "@hooks/useClient";

export default function App({ Component, pageProps }: AppProps) {
  const isClient = useIsClient();

  return (
    <>
      {isClient && <Toaster />}
      <Component {...pageProps} />
    </>
  );
}
