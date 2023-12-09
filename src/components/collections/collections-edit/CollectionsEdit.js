import React, { useEffect, useState } from 'react';
import style from './CollectionsEdit.module.css';
import Card from '../../../ui/Card';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { PickList } from 'primereact/picklist';
import Button from '../../../ui/Button';
import { ProgressSpinner } from 'primereact/progressspinner'


const CollectionsEdit = () => {
    const [name, setName] = useState("")
    const [isNameValid, setIsNameValid] = useState()
    const { id } = useParams()
    const [addedProducts, setAddedProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const navigate = useNavigate()
    const [isProcessing, setIsProcessing] = useState(false)
    const [selected, setSelected] = useState()

    const nameChangeHandler = (e) => {
        setName(e.target.value)
        setIsNameValid(e.target.value.trim().length > 0 ? '1' : '0')
    }

    useEffect(() => {
        try {

            axios.get(`http://localhost:9090/collection/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setName(response.data[0].name)
            })

            axios.get(`http://localhost:9090/collection/${id}/product`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setAddedProducts(response.data)
                return response.data
            }).then(resp => {
                axios.get(`http://localhost:9090/product`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    let temp = response.data
                    temp = temp.filter((elem) => resp.findIndex((a) => +a.id === +elem.id) === -1)
                    console.log(temp);
                    setAllProducts(temp)
                })
            })



        } catch (error) {
            console.error('API request error:', error);
        }
    }, [])

    const itemTemplate = (item) => {
        const formatedPrice = new Intl.NumberFormat('hu-HU', { maximumSignificantDigits: 20, style: 'currency', currency: 'HUF' })
        .format(item.discountedPrice ? item.discountedPrice : item.price);
        return (
            <div className={`${style.template} ${selected===item.id && style.selected}`} onClick={() => setSelected(item.id)}>
                <img className={style.image} src={`${item.image}`} alt={item.name} />
                <div className={style.info}>
                    <div >{item.name}</div>
                    <div className={style.price}>{formatedPrice}</div>
                </div>
                
            </div>
        );
    };

    const onChange = (event) => {
        setAllProducts(event.source);
        setAddedProducts(event.target);
    };


    const applyHandler = () => {
        setIsProcessing(true)
        try {
            const data = JSON.stringify({ name: name })
            axios.put('http://localhost:9090/collection/' + id, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                axios.delete(`http://localhost:9090/collection/${id}/product`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    for (let elem of addedProducts) {
                        axios.post(`http://localhost:9090/collection/${id}/product/${elem.id}`, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    }
                }).then(() => {
                    setIsProcessing(false)
                    navigate('/admin/collection')
                })
            })
        } catch (err) {
            console.error("API request error: " + err)
        }
    }



    return <div className={style.page}>
        {isProcessing ? <ProgressSpinner /> : <>
            <Card className={style.inputCard}>
                <label htmlFor='name'>Collections's name:</label>
                <input className={`${style.inputField} ${isNameValid === '0' && style.invalid}`} value={name} name='name' type='text' onChange={nameChangeHandler} />

            </Card>
            <Card className={style.productSelectCard}>
                <PickList source={allProducts} target={addedProducts} onChange={onChange} itemTemplate={itemTemplate} filter filterBy="name" breakpoint="1400px"
                    sourceHeader="Available" targetHeader="Selected" sourceStyle={{ height: '24rem' }} targetStyle={{ height: '24rem' }}
                    sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" />
            </Card>

            <Card className={style.buttons}>
                <Button className={style.apply} onClick={applyHandler}>Apply</Button>
                <Button onClick={() => navigate('/admin/collection')}>Cancel</Button>
            </Card></>}
    </div>;
}

export default CollectionsEdit;