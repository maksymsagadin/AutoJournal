import * as React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

import createEmotionServer from '@emotion/server/create-instance'

import createEmotionCache from '@/utils/createEmotionCache'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head >
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="icon" type='image/png' href="/autojournalLogo.png" />
          <link rel="apple-touch-icon" type='image/png' href="/autojournalLogo.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

// `_document`'s `getInitialProps` is executed during server-side rendering and static-site generation.
// It's called after `getInitialProps` in pages and components.
MyDocument.getInitialProps = async (context) => {
  
  // Execution order on the server:
  // 1. `App.getInitialProps`
  // 2. `page.getInitialProps`
  // 3. `MyDocument.getInitialProps`
  // 4. `App.render`
  // 5. `page.render`
  // 6. `MyDocument.render`

  // Execution order on the server with an error:
  // 1. `MyDocument.getInitialProps`
  // 2. `App.render`
  // 3. `page.render`
  // 4. `MyDocument.render`

  // Execution order on the client:
  // 1. `App.getInitialProps`
  // 2. `page.getInitialProps`
  // 3. `App.render`
  // 4. `page.render`

  // Override the `renderPage` method to inject emotion styles.
  const originalRenderPage = context.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  // This code block enhances the `App` component by passing the `emotionCache` created earlier and spreading any other `props` passed to it.
  // Then App is returned as part of the `getInitialProps` return object.
  context.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    })

  // Call the parent method to get initial props.
  const initialProps = await Document.getInitialProps(context);

  // Extract critical CSS for server-side rendering.
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ))

  // Return the initial props with emotion styles.
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStyleTags,
    ],
  }
}
