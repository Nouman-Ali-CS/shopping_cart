import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// Create root using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render using the root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)