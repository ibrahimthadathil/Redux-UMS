import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'
import {Provider} from 'react-redux'
import { store } from './store/store.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Toaster  position="top-right" richColors/>
      <Provider store={store}>
            <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
