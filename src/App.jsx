import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
// import { Navbar } from './components/Navbar'
import { Productprovider } from './context/Productprovider';
import { CatagoryProducts } from './context/CatagoryProducts';

import { Admindash } from './Admin/Admindash';
import { Adminorders } from './Admin/Adminorders';
import { Adminproduct } from './Admin/Adminproduct';
import { AdminLayout } from './Admin/Adminlayout';
import AdminLogin from './Admin/AdminLogin';
import { Checkout } from './pages/Checkout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Invoice } from './pages/Invoice';





const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    if (username === 'ammar' && password === 'ammar123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <BrowserRouter>
    

   
      {/* <Navbar locate={loc}/> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/products/:catagory"
          element={
            <Productprovider>
              <CatagoryProducts />
            </Productprovider>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/invoice" element={<Invoice />} />


        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/*"
          element={
            isAuthenticated ? (
              <AdminLayout />
            ) : (
              <Navigate to="/admin/login" replace />
            )
          }
        >
          <Route path="dashboard" element={<Admindash />} />
          <Route path="orders" element={<Adminorders />} />
          <Route path="products" element={  <Productprovider><Adminproduct /></Productprovider> } />
          {/* default -> redirect to dashboard */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default App;
