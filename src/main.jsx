import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Validación del root (evita errores silenciosos)
const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('No se encontró el elemento root en el DOM')
}

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
