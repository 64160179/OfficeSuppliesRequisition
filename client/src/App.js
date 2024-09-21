import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './components/Login.jsx';
import Home from "./pages/Home.jsx";

import Users from './pages/User/Users.jsx';
import AddUser from './pages/User/AddUser.jsx';
import EditUser from './pages/User/EditUser.jsx';
import EditProfile from './pages/Setting/EditProfile.jsx';

import Products from './pages/Product/Products.jsx';
import AddProduct from './pages/Product/AddProduct.jsx';
import EditProduct from './pages/Product/EditProduct.jsx';

import Historys from './pages/Historys.jsx';

import Location from './pages/Location/Location.jsx';
import AddLocation from './pages/Location/AddLocation.jsx';
import EditLocation from './pages/Location/EditLocation.jsx';

import CountingUnit from './pages/CountingUnit/CountingUnit.jsx';
import AddCountingUnit from './pages/CountingUnit/AddCountingUnit.jsx';
import EditCountingUnit from './pages/CountingUnit/EditCountingUnit.jsx';


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
          <Route path="/editprofile/:id" element={<EditProfile />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/add" element={<AddProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />

          <Route path="/historys" element={<Historys />} />

          <Route path="/locations" element={<Location />} />
          <Route path="/locations/add" element={<AddLocation />} />
          <Route path="/locations/edit/:id" element={<EditLocation />} />

          <Route path="/countingunits" element={<CountingUnit />}/>
          <Route path="/countingunits/add" element={<AddCountingUnit />} />
          <Route path="/countingunits/edit/:id" element={<EditCountingUnit />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
