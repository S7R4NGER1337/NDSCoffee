import { Route, Routes } from "react-router";
import AdminPage from "./admin/adminPage.js";
import AdminCreate from "./admin/adminCreate.js";
import OrdersPage from "./admin/ordersPage.js";
import ProductPage from "./product/ProductPage.js";
import "./App.css";
import Home from "./home/Home.js";
import Catalog from "./catalog/Catalog.js";
import Order from "./order/Order.js";

export function setOrder(productId) {
  if (!productId) return;
  const cartInfo = JSON.parse(localStorage.getItem("cart")) || [];
  const index = cartInfo.findIndex((item) => item.id === productId);

  if (index > -1) {
    cartInfo[index].qty += 1;
  } else {
    cartInfo.push({ id: productId, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cartInfo));
  return cartInfo;
}


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/create" element={<AdminCreate />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </div>
  );
}

export default App;
