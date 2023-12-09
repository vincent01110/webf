import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import AdminProductPage from './pages/AdminProductPage';
import LoginPage from './pages/login-page/LoginPage';
import { RequireAuth } from 'react-auth-kit';
import ProductAdd from './components/products/product-add-edit/ProductAdd';
import ProductEdit from './components/products/product-add-edit/ProductEdit';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path="/admin/product" element={<RequireAuth loginPath='/'>
          <AdminProductPage />
        </RequireAuth>} />
      <Route path='/admin/product/add' element={<ProductAdd />} />
      <Route path='/admin/product/edit/:id' element={<ProductEdit />} />
    </Routes>
  );
}

export default App;
