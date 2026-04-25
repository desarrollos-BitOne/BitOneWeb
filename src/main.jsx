import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Este busca el "export default" que acabamos de agregar
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
