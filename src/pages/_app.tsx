import type { AppProps } from "next/app";
import { useEffect } from "react";
import { getCookie } from "@/cookieManager";
import "@/styles/bootstrap-brite.css";
import "@/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Set theme
    const theme = getCookie("theme");
    document?.getElementById("html")?.setAttribute("data-bs-theme", theme);
  }, []);

  return <Component {...pageProps} />;
};

export default App;
