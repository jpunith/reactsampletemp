import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './login/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.scss'
import Dashboard from './dashboard/dashboard';
import Navbar from './navbar/navbar';
import Footer from './footer/footer';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col justify-between'>
        <Navbar />
        <div className='bg-gray-50 min-h-[calc(100vh-117px)]'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('app')
if (!rootElement) throw new Error('Failed to find the root element')

const root = ReactDOM.createRoot(rootElement as HTMLElement)

root.render(<App />)

export default App