import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DemoProvider } from './contexts/DemoStateContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoProvider>
      <App />
    </DemoProvider>
  </StrictMode>,
)
