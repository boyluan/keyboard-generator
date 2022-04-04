import Document, { Html, Head, Main, NextScript } from 'next/document'

import Footer from '../components/footer'

// import Header from '../components/header'

import MetaMaskAccountProvider from '../components/meta-mask-account-provider'

import '../components/meta-mask-account-provider'

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
        <body className='bg-gradient-to-r from-gray-400 via-red-100 to-blue-100'>
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
