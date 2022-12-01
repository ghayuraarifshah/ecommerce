import type { AppProps } from "next/app";
import Footer from "../components/Footer";
import "../styles/global.css";
import { UserProvider } from "../providers/userProvider";
import { CartProvider } from "../providers/cartProvider";
import Header from "../components/Header";
import { OrderProvider } from "../providers/orderProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex flex-col">
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </OrderProvider>
        </CartProvider>
      </UserProvider>
    </main>
  );
}

export default MyApp;
