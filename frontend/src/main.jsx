import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <ErrorBoundary> <App /></ErrorBoundary>

      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
