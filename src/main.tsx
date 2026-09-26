import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProviders } from '@/theme'
import App from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <ThemeProviders>
      <App />
    </ThemeProviders>
  </StrictMode>
)
