import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useEffect } from "react";
import { DarkModeProvider } from "../utils/DarkModeStore";
import { CartProvider } from "../utils/CartStore";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement?.removeChild(jssStyles);
  }, []);

  return (
    <CartProvider>
      <DarkModeProvider>
        <Component {...pageProps} />
      </DarkModeProvider>
    </CartProvider>
  );
}

export default MyApp;
