import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/global.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex flex-col">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

export default MyApp;
