import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import AdminProductPage from './pages/AdminProductPage';
import LoginPage from './pages/login-page/LoginPage';
import { RequireAuth } from 'react-auth-kit';
import ProductAdd from './components/products/product-add-edit/ProductAdd';
import ProductEdit from './components/products/product-add-edit/ProductEdit';
import AdminCollectionPage from './pages/AdminCollectionPage';
import CollectionsAdd from './components/collections/collections-add/CollectionsAdd';
import CollectionsEdit from './components/collections/collections-edit/CollectionsEdit';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path="/admin/product" element={<RequireAuth loginPath='/'>
        <AdminProductPage />
      </RequireAuth>} />

      <Route path="/admin/product/add" element={<RequireAuth loginPath='/'>
        <ProductAdd />
      </RequireAuth>} />

      <Route path="/admin/product/edit/:id" element={<RequireAuth loginPath='/'>
        <ProductEdit />
      </RequireAuth>} />

      <Route path="/admin/collection" element={<RequireAuth loginPath='/'>
        <AdminCollectionPage />
      </RequireAuth>} />

      <Route path="/admin/collection/add" element={<RequireAuth loginPath='/'>
        <CollectionsAdd />
      </RequireAuth>} />

      <Route path="/admin/collection/edit/:id" element={<RequireAuth loginPath='/'>
        <CollectionsEdit />
      </RequireAuth>} />

    </Routes>
  );
}

export default App;
