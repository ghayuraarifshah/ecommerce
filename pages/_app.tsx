import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import "../styles/global.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex flex-col">
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

export default MyApp;
