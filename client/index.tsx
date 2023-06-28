import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Auth0Provider } from '@auth0/auth0-react'

import App from './components/App'

const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
      domain="https://euan.au.auth0.com"
      clientId="ft8uNjFjD1pLQn5knzXG2PcS3QH9Y5W6"
      redirectUri={window.location.origin}
      audience="https://todo/api"
    >
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Auth0Provider>
  )
})
