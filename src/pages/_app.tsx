import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { CacheProvider, ThemeProvider } from '@emotion/react'
import createEmotionCache from '@/lib/create-emotion-cache'
import { appTheme } from '@/styles/theme'
import { GlobalStyles } from '@/styles/globals'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [emotionCache] = useState(clientSideEmotionCache)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={appTheme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyles />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
