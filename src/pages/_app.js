import { AuthProvider, CartProvider } from "@/contexts";
import "semantic-ui-css/semantic.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/scss/global.scss";
import { SessionProvider } from 'next-auth/react'


export default function App(props) {
  const { Component, pageProps, session } = props;

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
