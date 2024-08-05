import React from 'react'
import ReactDOM from 'react-dom/client'
import ApiProvider from './common/ApiProvider.tsx'
import { HackerNewsPageContainer } from './pages/HackerNewsPage.container.tsx'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { QueryClient, QueryClientProvider } from 'react-query'

const theme = createTheme()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ApiProvider>
        <QueryClientProvider client={queryClient}>
          <HackerNewsPageContainer />
        </QueryClientProvider>
      </ApiProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
