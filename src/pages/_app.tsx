import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'


import '@fontsource/roboto/300.css'
import '@fontsource/roboto/700.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'

import createEmotionCache from '@/utilities/createEmotionCache'
import lightTheme from '@/styles/themes/lightTheme'
import darkTheme from '@/styles/themes/darkTheme'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

const light = createTheme(lightTheme)
const dark = createTheme(darkTheme)

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp