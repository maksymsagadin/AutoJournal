import { useEffect } from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SessionProvider, useSession } from 'next-auth/react'
import { Router as NextRouter, useRouter } from 'next/router'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/utils/createEmotionCache'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import darkTheme from '@/styles/themes/darkTheme'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
  router: NextRouter
}

const clientSideEmotionCache = createEmotionCache()
const dark = createTheme(darkTheme)

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const protectedRoutes = ['/dashboard','/profile']

  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.includes(router.pathname)

  // If the current route is a protected route,
  // redirect to login
  useEffect(() => {
    if (isProtectedRoute && status !== 'loading' && !session) {
      router.push('/login')
    }
  }, [isProtectedRoute, router, session, status])

  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={dark}>
          <CssBaseline />
          <Head>
            <title> 🚓 - AutoJournal</title>
            <meta name="viewport" content='width=device-width, initial-scale=1, viewport-fit=cover' />
            <link rel="icon" type='image/png' href="/autojournalLogo.png" />
            <link rel="apple-touch-icon" type='image/png' href="/autojournalLogo.png" />
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
  )
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MyApp Component={Component} pageProps={pageProps} router={router} />
    </SessionProvider>
  )
}