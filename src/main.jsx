import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './components/util/ScrollToTop.js'
import { AuthProvider } from './components/context/authContext.tsx'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <Theme>
          <App />
        </Theme>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
