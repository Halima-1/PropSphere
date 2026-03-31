import { useState } from 'react'

import './App.css'
import AppkitWrapper from './connection/index'
import ConnectButton from './connectionButton'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import MarketPlace from './pages/MarketPlace';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  const Layout = () => {
    return (
      <>
        <Header />
        <Outlet />
        <Footer />
      </>
    );
  };
  return (
    <>
      <AppkitWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/productPage" element={<PropertyDetails />} />
              <Route path="/home" element={<MarketPlace />} />
            </Route>
            {/* <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} /> */}
          </Routes>
        </BrowserRouter>
      </AppkitWrapper>
    </>
  )
}

export default App
