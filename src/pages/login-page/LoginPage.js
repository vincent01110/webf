import React from 'react';
import Card from '../../ui/Card';
import style from './LoginPage.module.css';
import LoginForm from '../../components/login-form/LoginForm';


const LoginPage = () => {
    return <div className={style.page}>
        <LoginForm />
    </div>
}
 
export default LoginPage;