import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { CacheProvider, Global, ThemeProvider } from '@emotion/react'
import createEmotionCache from '@/lib/create-emotion-cache'
import theme from '@/styles/theme'
import { globalStyles } from '@/styles/globals'

const clientSideEmotionCache = createEmotionCache()

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  const [emotionCache] = useState(clientSideEmotionCache)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
