import React from 'react';
import style from './AdminCollectionPage.module.css';
import Navigator from '../components/navigator/Navigator';
import Collections from '../components/collections/Collections';


const AdminCollectionPage = () => {
    return <div className={style.page}>
        <Collections />
        <Navigator />
    </div>;
}
 
export default AdminCollectionPage;