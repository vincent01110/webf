import React, { useRef, useState, useEffect } from "react";
import Card from "../../../ui/Card";
import style from './ProductAddEdit.module.css';
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import Button from "../../../ui/Button";
import { useNavigate, useParams } from "react-router";
import { Toast } from "primereact/toast";

const categories = [
    { name: 'Phone', code: 'phone' },
    { name: 'Smart Watch', code: 'smart_watch' },
    { name: 'TV', code: 'tv' },
    { name: 'Laptop', code: 'laptop' },
    { name: 'Tablet', code: 'tablet' }
]

const ProductEdit = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState()
    const [name, setName] = useState('')
    const [price, setPrice] = useState()
    const [attribute, setAttribute] = useState('')
    const [discounts, setDiscounts] = useState([])
    const [selectedDiscount, setSelectedDiscount] = useState()
    const [img, setImg] = useState('')
    const [errorMsg, setErrorMsg] = useState()
    const { id } = useParams()
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
                return l;
            }).then((response) => {
                fillFields(response)
            })
        } catch (error) {
            console.error('API request error:', error);
        }
    }, [])

    const fillFields = (l) => {
        try {
            axios.get(`http://localhost:9090/product/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                categories.forEach((e) => {
                    if (e.code === response.data.category) {
                        setCategory(e)
                        return;
                    }
                })
                setName(response.data.name)
                setPrice(response.data.price)
                setAttribute(JSON.stringify(response.data.attribute))
                l.forEach((e) => {
                    if (e.code === String(response.data.discount_id)) {
                        setSelectedDiscount(e)
                        return;
                    }
                })
                setImg(response.data.image)
            })
        } catch (err) {
            console.error('API request error:', err);
        }
    }



    const onEdit = (e) => {
        e.preventDefault()
        const isValid = validateForm()
        if (isValid) {
            const data = JSON.stringify({
                category: category.code,
                name: name,
                attribute: JSON.parse(attribute),
                price: price,
                discount_id: selectedDiscount.code === 'none' ? null : +selectedDiscount.code,
                image: img
            })
            try {
                axios.put('http://localhost:9090/product/' + id, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    navigate('/admin/product')
                })
            } catch (err) {
                console.error("API request error: " + err)
            }
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
        if (!includesCategory) {
            toast.current.show({ severity: 'error', summary: 'Form error', detail: 'Please select a category', life: 3000 });
            return false;
        }
        if (name.trim().length === 0) {
            toast.current.show({ severity: 'error', summary: 'Form error', detail: 'Name cannot be empty', life: 3000 });
            return false;
        }
        if (price === 0) {
            toast.current.show({ severity: 'error', summary: 'Form error', detail: 'Price cannot be 0', life: 3000 });
            return false;
        }
        const includesDiscount = discounts.find(elem => elem === selectedDiscount)
        if (!includesDiscount) {
            toast.current.show({ severity: 'error', summary: 'Form error', detail: 'Please select a discount', life: 3000 });
            return false;
        }
        return true;
    }

    return <div className={style.page}>
        <Card className={style.formCard}>
        <Toast ref={toast} />
        <h1>Add Product</h1>
        <form onSubmit={onEdit}>
            <Dropdown data-pr-classname={style.item} panelClassName={`${style.items}`} className={style.dropdown} value={category} onChange={(e) => setCategory(e.value)} options={categories} optionLabel="name"
                placeholder="Category" /> <br />
            <InputText placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} className={style.inputText} />
            <InputNumber placeholder="Price..." value={price} onValueChange={(e) => setPrice(e.value)} suffix=" Ft" inputClassName={style.inputNumber} />
            <InputTextarea autoResize placeholder="Attributes (Please provide valid JSON)" value={attribute} onChange={(e) => setAttribute(e.target.value)} rows={5} cols={30} className={`${style.inputText} ${style.textArea}`} /><br />
            {discounts.length > 1 && <Dropdown data-pr-classname={style.item} panelClassName={style.items} className={style.dropdown} value={selectedDiscount} onChange={(e) => setSelectedDiscount(e.value)} options={discounts} optionLabel="name" placeholder="Discounts" />}<br />
            <InputText placeholder="Image URL..." value={img} onChange={(e) => setImg(e.target.value)} className={style.inputText} />
            {errorMsg && <div className={style.error}>{errorMsg}</div>}
            <div className={style.buttons}>
                <Button type="submit" className={style.addButton}>Modify</Button>
                <Button onClick={onCancel} className={style.cancelButton}>Cancel</Button>
            </div>
        </form>
    </Card>
    </div>
}

export default ProductEdit;