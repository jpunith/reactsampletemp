import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './components/auth/login/login'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.scss'

import Dashboard from './components/dashboard/dashboard';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';

import store from './states/store'
import { Provider } from 'react-redux'

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col h-full min-h-screen'>
        <Navbar />
        <div className='h-full p-4'>
          <Routes>
            <Route path="/" element={<Login />} />
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

root.render(
  <Provider store={store}>
    <App />
  </Provider>)

export default App