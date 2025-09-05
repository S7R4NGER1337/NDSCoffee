import { Route, Routes } from "react-router";
import { useState } from "react";
import "./App.css";
import AuthGuard from "./authGuard.js";
import {  userAuthenticated } from './api/user.js'

import Nav from "./components/nav.js";
import AdminPage from './pages/admin/adminPage.js'
import AdminForm from "./pages/admin/AdminForm.js";
import AdminLogin from "./pages/admin/adminLogin.js";
import Home from './pages/home/Home.js'
import Catalog from "./pages/catalog/Catalog.js";
import OrdersPage from './pages/admin/ordersPage.js'
import Order from "./pages/order/Order.js";
import ProductPage from './pages/product/ProductPage.js'
import AboutRedirect from "./components/AboutRedirect.js";
import Footer from "./components/Footer.js";


function App() {

  const [authenticated, setAuthenticated] = useState(false)

  async function loginSubmit(userData) {
    const isAuthenticated = await userAuthenticated(userData)
    setAuthenticated(isAuthenticated)
    
    return isAuthenticated ? true : false;
  }

  return (
    <>
    <Nav />
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AuthGuard isAuthenticated={authenticated} />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/create" element={<AdminForm />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/edit/:id" element={<AdminForm />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin loginSubmit={loginSubmit}/>} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/order" element={<Order />} />
        <Route path="/about" element={<AboutRedirect />} />
      </Routes>
    </div>
    <Footer />
    </>
  );
}

export default App;
