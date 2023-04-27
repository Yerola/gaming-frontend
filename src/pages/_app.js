import { AuthProvider, CartProvider } from "@/contexts";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/scss/global.scss";
/**
 *   // <AuthProvider>
    //  <CartProvider>
        <Component {...pageProps} />
     // </CartProvider>
   // </AuthProvider>
 */
export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
