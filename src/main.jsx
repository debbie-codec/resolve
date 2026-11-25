import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Find the HTML element in index.html and put the React application inside it.
// StrictMode helps development catch unsafe side effects, extra renders, and
// other mistakes while React is running.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
