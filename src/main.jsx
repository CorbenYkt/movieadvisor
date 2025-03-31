import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google"

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='604235982281-vutqgstadkbkuponr92g1g07curs0dbd.apps.googleusercontent.com'>
    <Router>
      <App />
    </Router>
  </GoogleOAuthProvider>
)
