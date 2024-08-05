import React from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import App from './App.tsx'
import { store } from './Redux/store.ts'
import './index.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    </BrowserRouter>
  </Provider>
)
