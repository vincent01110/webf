import React from 'react';
import Card from '../../ui/Card';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import style from './Logout.module.css';

const Logout = () => {
    const logout = useSignOut()
    const navigate = useNavigate()

    const logoutHandler = () => {
        logout()
        localStorage.removeItem('email')
        navigate("/")
    }

    return <Card className={style.card}>
        {localStorage.getItem('email')}
        <button onClick={logoutHandler}>Log Out</button>
    </Card>;
}
 
export default Logout;