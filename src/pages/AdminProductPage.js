import React from 'react';
import style from './AdminProductPage.module.css';
import Products from '../components/products/Products';
import Logout from '../components/logout/Logout';
import Navigator from '../components/navigator/Navigator';


const AdminProductPage = () => {
    return <div className={style.page}>
        <Logout />
        <Products />

        <Navigator />
    </div>;
}
 
export default AdminProductPage;