import React, { useState } from 'react';
import style from './CollectionsAdd.module.css';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CollectionsAdd = () => {
    const [name, setName] = useState("")
    const [isNameValid, setIsNameValid] = useState()
    const navigate = useNavigate()


    const changeHandler = (e) => {
        setName(e.target.value)
        setIsNameValid(e.target.value.trim().length > 0 ? '1' : '0')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(isNameValid === '1'){
            try{
                const data = JSON.stringify({name: name})
                axios.post('http://localhost:9090/collection', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    navigate('/admin/collection')
                })
            } catch(err){
                console.error(err);
            }
        }
    }

    return <div className={style.page}>
        <Card className={style.card}>
            <form onSubmit={submitHandler}>
                <div className={style.input}>
                    <label htmlFor='name'>Collections's name:</label>
                    <input className={`${style.inputField} ${isNameValid === '0' && style.invalid}`} value={name} name='name' type='text' onChange={changeHandler} />
                </div>

                <div>
                    <Button type="submit" className={style.add}>Add</Button>
                    <Button onClick={() => navigate('/admin/collection')} className={style.cancel}>Cancel</Button>
                </div>
            </form>
        </Card>
    </div>
}

export default CollectionsAdd;