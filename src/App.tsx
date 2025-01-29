import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './login/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.scss'
import Dashboard from './dashboard/dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)

export default App