import React from 'react';
import style from './AdminPage.module.css';
import Products from '../components/products/Products';
import Logout from '../components/logout/Logout';


const AdminPage = () => {
    return <div className={style.page}>
        <Logout />
        <Products />
    </div>;
}
 
export default AdminPage;