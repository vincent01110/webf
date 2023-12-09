import React, { useReducer, useState, useEffect, useRef } from "react";
import style from './ProductAddEdit.module.css'
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import Button from "../../../ui/Button";
import { useNavigate } from "react-router";
import { Toast } from "primereact/toast";
import Card from "../../../ui/Card";

const categories = [
    { name: 'Phone', code: 'phone' },
    { name: 'Smart Watch', code: 'smart_watch' },
    { name: 'TV', code: 'tv' },
    { name: 'Laptop', code: 'laptop' },
    { name: 'Tablet', code: 'tablet' }
]

const ProductAdd = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [attribute, setAttribute] = useState('')
    const [discounts, setDiscounts] = useState([])
    const [selectedDiscount, setSelectedDiscount] = useState()
    const [img, setImg] = useState('')
    const toast = useRef(null)


    useEffect(() => {
        try {
            // Make an API call to your authentication endpoint (replace with your actual API URL)
            axios.get('http://localhost:9090/discounts', {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                let l = []
                l.push({ name: 'none', code: 'none' })
                response.data.forEach(element => {
                    l.push({ name: `${element.id} - ${element.percentage}%`, code: `${element.id}` })
                });
                setDiscounts(l)
            })
        } catch (error) {
            console.error('API request error:', error);
        }
    }, [])

    const onAdd = (e) => {
        e.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            const data = JSON.stringify({
                category: category.code,
                name: name,
                attribute: JSON.parse(attribute),
                price: price,
                discount_id: selectedDiscount.code === 'none' ? null : selectedDiscount.code,
                image: img
            })
            console.log(data);
            try{
                axios.post('http://localhost:9090/product', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    navigate('/admin/product')
                })
            } catch(err){
                console.error("API request error: " + err)
                toast.current.show({ severity: 'error', summary: 'API error', detail: 'Error connecting to database', life: 3000 });
            }
        } else {

        }
    }

    const onCancel = () => {
        navigate('/admin/product')
    }

    const validateForm = () => {
        try {
            JSON.parse(attribute.trim())
        } catch (err) {
            toast.current.show({ severity: 'error', summary: 'JSON error', detail: 'Attribute field is not a valid JSON', life: 3000 });
            return false;
        }
        
        const includesCategory = categories.find(elem => elem === category)
        if(!includesCategory){
            toast.current.show({ severity: 'error', summary: 'Form error', detail: 'Please select a category', life: 3000 });
            return false;
        }
        if(name.trim().length === 0 ){
            toast.current.show({ severity: 'error', summary: 'Form error', detail: 'Name cannot be empty', life: 3000 });
            return false;
        }
        if(price === 0){
            toast.current.show({ severity: 'error', summary: 'Form error', detail: 'Price cannot be 0', life: 3000 });
            return false;
        }
        const includesDiscount = discounts.find(elem => elem === selectedDiscount)
        if(!includesDiscount){
            toast.current.show({ severity: 'error', summary: 'Form error', detail: 'Please select a discount', life: 3000 });
            return false;
        }
        return true;
    }

    return <div className={style.page}>
        <Card className={style.formCard}>
        <Toast ref={toast}/>
        <h1>Add Product</h1>
        <form onSubmit={onAdd}>
            <Dropdown data-pr-classname={style.item} panelClassName={`${style.items}`} className={style.dropdown} value={category} onChange={(e) => setCategory(e.value)} options={categories} optionLabel="name"
                placeholder="Category" /> <br />
            <InputText placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} className={style.inputText} />
            <InputNumber placeholder="Price..." value={price} onValueChange={(e) => setPrice(e.value)} suffix=" Ft" inputClassName={style.inputNumber} />
            <InputTextarea autoResize placeholder="Attributes (Please provide valid JSON)" value={attribute} onChange={(e) => setAttribute(e.target.value)} rows={5} cols={30} className={`${style.inputText} ${style.textArea}`} /><br />
            {discounts.length > 1 && <Dropdown data-pr-classname={style.item} panelClassName={style.items} className={style.dropdown} value={selectedDiscount} onChange={(e) => setSelectedDiscount(e.value)} options={discounts} optionLabel="name" placeholder="Discounts" />}<br />
            <InputText placeholder="Image URL..." value={img} onChange={(e) => setImg(e.target.value)} className={style.inputText} />
            <div className={style.buttons}>
            <Button type="submit" className={style.addButton}>Add</Button>
            <Button onClick={onCancel} className={style.cancelButton}>Cancel</Button>
            </div>
        </form>
    </Card>
    </div>
}

export default ProductAdd;