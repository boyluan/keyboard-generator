import Document, { Html, Head, Main, NextScript } from 'next/document'

import Footer from '../components/footer'
import MetaMaskAccountProvider from '../components/meta-mask-account-provider.js'
import Header from '../components/header'

import '../components/meta-mask-account-provider.js'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (

      <Html>
        <MetaMaskAccountProvider>
        <Head />
        <body className='bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400'>
          <main className='max-w-3xl mx-auto'>
            <link
            as="font"
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@600&display=swap"
            />

            <Main />
            
          </main>
          <Footer />
          <NextScript />

        </body>
        </MetaMaskAccountProvider>
      </Html>
      
    )
  }
}

export default MyDocument
