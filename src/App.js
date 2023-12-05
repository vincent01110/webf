import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/login-page/LoginPage';
import { RequireAuth } from 'react-auth-kit';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path="/admin" element={<RequireAuth loginPath='/'>
          <AdminPage />
        </RequireAuth>} />
    </Routes>
  );
}

export default App;
