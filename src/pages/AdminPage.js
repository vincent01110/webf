import React from 'react';
import style from './AdminPage.module.css';
import Products from '../components/products/Products';


const AdminPage = () => {
    return <div className={style.page}>
        <Products />
    </div>;
}
 
export default AdminPage;