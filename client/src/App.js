import {Route, Routes} from 'react-router'
import AdminPage from './admin/adminPage.js';
import AdminCreate from './admin/adminCreate.js';
import OrdersPage from './admin/ordersPage.js'

import './App.css';
import Home from './home/Home.js';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/create" element={<AdminCreate />} />
          <Route path="/admin/orders" element={<OrdersPage/>} />
        </Routes>
    </div>
  );
}

export default App;
