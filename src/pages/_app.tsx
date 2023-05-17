import { useEffect } from 'react'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '@/utilities/createEmotionCache'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
// import lightTheme from '@/styles/themes/lightTheme'
import darkTheme from '@/styles/themes/darkTheme'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// const light = createTheme(lightTheme)
const dark = createTheme(darkTheme)

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const router = useRouter()
  const protectedRoutes = ['/dashboard']

  // Check if the current route is a protected route
  const isProtectedRoute = protectedRoutes.includes(router.pathname)

  // If the current route is a protected route and the user is not authenticated,
  // redirect them to the login page
  useEffect(() => {
    if (isProtectedRoute) {
      router.push('/login')
    }
  }, [isProtectedRoute, router])

  return isProtectedRoute ? (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={dark}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  ) : (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp