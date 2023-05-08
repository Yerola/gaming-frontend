import { SessionProvider } from "next-auth/react";
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
//export default function App({ Component, pageProps, session }) {//asi estaba
  export default function App({  Component,  pageProps: { session, ...pageProps },}) {
  return (
    <AuthProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </AuthProvider>
  );
}
