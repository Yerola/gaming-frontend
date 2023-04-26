import 'semantic-ui-css/semantic.min.css'
//After install, import the minified CSS file in your app's entry file:
import '@/scss/global.scss'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
