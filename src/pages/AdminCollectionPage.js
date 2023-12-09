import React from 'react';
import style from './AdminCollectionPage.module.css';
import Navigator from '../components/navigator/Navigator';
import Collections from '../components/collections/Collections';
import Logout from '../components/logout/Logout';


const AdminCollectionPage = () => {
    return <div className={style.page}>
        <Logout />
        <Collections />
        <Navigator />
    </div>;
}
 
export default AdminCollectionPage;