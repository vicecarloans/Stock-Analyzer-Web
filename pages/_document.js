/* eslint-disable */
import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyCustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags }; // return styles collected
  }

  render() {
    return (
      <html>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/css/nprogress.css"
          />
          <script id="stripe-js" src="https://js.stripe.com/v3/" async />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script type="text/javascript" src="/static/js/materialize.min.js" />
        </body>
      </html>
    );
  }
}
