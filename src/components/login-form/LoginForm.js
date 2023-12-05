import React, { useState, useEffect, useReducer } from 'react';
import Card from '../../ui/Card';
import style from './LoginForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';
import axios from 'axios';


const LoginForm = () => {
    const navigate = useNavigate()
    const signIn = useSignIn()
    const [errorMsg, setErrorMsg] = useState()
    const [email, dispatchEmail] = useReducer((state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: action.val.includes('@') }
        }
        return { value: '', isValid: false }
    }, { value: '', isValid: null })
    const [password, dispatchPassword] = useReducer((state, action) => {
        if (action.type === 'USER_INPUT') {
            return { value: action.val, isValid: action.val.trim().length >= 6 }
        }
        return { value: '', isValid: false }
    }, { value: '', isValid: null })

    const submitHandler = async (e) => {
        e.preventDefault();
    }

    const login = async () => {
        if (email.isValid && password.isValid) {
            let data = JSON.stringify({
                email: email.value,
                password: password.value
            });
            try {
                // Make an API call to your authentication endpoint (replace with your actual API URL)
                const response = await axios.post('http://localhost:9090/user/signin', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                signIn({
                    token: response.data.token,
                    expiresIn: 60,
                    tokenType: "Bearer",
                    authState: { email: email.value }
                })
                localStorage.setItem('email', email.value)
                navigate("/admin")
            } catch (err) {
                if (err.response.status === 401) {
                    setErrorMsg(err.response.data)
                } else {
                    console.log(err);
                }
            }
        } else {
            console.log('Credentials are not valid');
        }
    }

    const emailChangeHandler = (e) => {
        dispatchEmail({ val: e.target.value, type: 'USER_INPUT' })
    }

    const passwordChangeHandler = (e) => {
        dispatchPassword({ val: e.target.value, type: 'USER_INPUT' })
    }


    return <Card className={style.card}>
        <form onSubmit={submitHandler}>
            <input placeholder='Email...' type='email' onChange={emailChangeHandler} />
            <input placeholder='Password...' type='password' onChange={passwordChangeHandler} />
            <div className={style.buttons}>
                <button onClick={login}>Log In</button>
                <button>Register</button>
            </div>
            {errorMsg && <div className={style.error}>{errorMsg}</div>}
        </form>
    </Card>;
}
 
export default LoginForm;