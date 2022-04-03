import '../styles/globals.css'
import Header from '../components/header'
import '../styles/app.css'

// We'll update this {{ _app.js }} file to include the toast-notification-displayer (contd. below)
// And this will let us send toasts from anywhere in our dApp, and have them displayed
import { Toaster } from 'react-hot-toast'

import MetaMaskAccountProvider from '../components/meta-mask-account-provider'

function MyApp({ Component, pageProps }) {
  return (
    // Here, we're wrapping our pages with the provider
    // And this gives them access to this data
    <MetaMaskAccountProvider>
      <Header />
      <Toaster />
      <Component {...pageProps} />

    </MetaMaskAccountProvider>
  )
}

export default MyApp
