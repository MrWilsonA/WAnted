import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@fontsource/special-elite";
import "@fontsource/caveat";
import "@fontsource/rye";
import "./styles/tokens.css";
import "./styles/global.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
