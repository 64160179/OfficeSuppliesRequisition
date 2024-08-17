import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login.jsx';
import Home from "./pages/Home.jsx";
import Users from './pages/Users.jsx';
import AddUser from './pages/AddUser.jsx';
import EditUser from './pages/EditUser.jsx';
import Products from './pages/Products.jsx';
import AddProduct from './pages/AddProduct.jsx';
import Historys from './pages/Historys.jsx';
import AddHistory from './pages/AddHistory.jsx';
import AddRequest from './pages/AddRequest.jsx';
import EditProfile from './pages/EditProfile.jsx';
import EditProduct from './pages/EditProduct.jsx';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />

          <Route path="/historys" element={<Historys />} />
          <Route path="/historys/add" element={<AddHistory />} />

          <Route path="/addrequest" element={<AddRequest />} />

          <Route path="/editprofile/:id" element={<EditProfile />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
