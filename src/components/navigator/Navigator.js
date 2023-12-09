import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './Navigator.module.css';


const Navigator = () => {
    const location = useLocation()


    return <div>
        {location.pathname}
    </div>;
}
 
export default Navigator;