import '../styles/globals.css'
import Header from '../components/header'
import '../styles/app.css'

// Import 'Head' and include favicon code between the <Head/> tags
// See: https://stackoverflow.com/questions/56213019/how-to-add-a-favicon-to-a-next-js-static-site
// ##
import Head from 'next/head'; // ## <https://nextjs.org/docs/basic-features/static-file-serving>

// We'll update this {{ _app.js }} file to include the toast-notification-displayer (contd. below)
// And this will let us send toasts from anywhere in our dApp, and have them displayed
import { Toaster } from 'react-hot-toast'

import MetaMaskAccountProvider from '../components/meta-mask-account-provider'

function MyApp({ Component, pageProps }) {
  return (
    <>
    {/* Here, we're wrapping our pages with the provider
    // And this gives them access to this data */}
    <MetaMaskAccountProvider>
      <Head>
            <meta charSet="utf-8" />
            <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
            {/* <link rel="icon" href="/static/favicon.ico" /> */}
            <link rel="icon" href="/static/safari-pinned-tab.svg" />
            <link rel="manifest" href="/site.webmanifest"/>
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>

            <meta
                name="description"
                content="Web site created using create-next-app"
            />

            <meta name="msapplication-TileColor" content="#da532c"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#ffffff"/>

            <title>Keyboard Generator</title>
            <meta name="title" content="An on-chain keyboard generator" />
            <meta name="description" content="Generate a Keyboard on Ethereum's testnet" />
        </Head>
          <Header />
        <Toaster />
      <Component {...pageProps} />
    </MetaMaskAccountProvider>
    </>
  );
}

export default MyApp
