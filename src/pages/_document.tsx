import withTwindDocument from '@twind/next/shim/document'
import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'

import twindConfig from '../twind.config'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <script async defer data-domain='dizzapp.dev' src='https://mything.wcastand.dev/js/plausible.js'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default withTwindDocument(twindConfig, MyDocument)
