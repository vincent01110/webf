import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './Navigator.module.css';
import Card from '../../ui/Card';


const Navigator = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const clickHandler = () => {
        if(location.pathname === '/admin/product'){
            navigate('/admin/collection')
        } else if(location.pathname === '/admin/collection'){
            navigate('/admin/product')
        }
    }

    return <Card className={style.card}>
        <button onClick={clickHandler}>
            {location.pathname === '/admin/product' ? 'Collections ->' : '<- Products'}
        </button>
    </Card>;
}
 
export default Navigator;