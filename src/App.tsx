import { useState } from 'react'

import './App.css'
import AppkitWrapper from './connection/index'
import ConnectButton from './connectionButton'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import MarketPlace from './pages/MarketPlace';
import UserProperties from './pages/UserProperties';
import Overview from './pages/Overview';
import Settings from './pages/Settings';
import PropertyDetails from './pages/PropertyDetails';
import Dashboard from './pages/Dashboard';
import UserTransaction from './pages/UserTransaction';
import AddNewProperty from './pages/AddNewProperty';

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

   const dashboardLayout = () => {
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
              <Route path="/Dashboard/overview" element={<Overview />} />
              <Route path="/MarketPlace" element={<MarketPlace />} />
              <Route path="/Dashboard/settings" element={<Settings />} />
              <Route path="/Dashboard/transaction" element={<UserTransaction />} />
              <Route path="/Dashboard/properties" element={<UserProperties />} />
              <Route path="/Dashboard/create-property" element={<AddNewProperty />} />

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
