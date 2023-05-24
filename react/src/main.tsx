import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./style/common.css"
import 'antd/dist/antd.css'
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)
