import React, {useState, useEffect} from 'react';
import Card from '../../ui/Card';
import style from './Products.module.css';
import ProductTable from './product-table/ProductTable';
import ProductButtons from './product-buttons/ProductButtons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState()
    const [products, setProducts] = useState()
    const navigate = useNavigate()

    const selectChangeHandler = (p) => {
        setSelectedProduct(p)
        console.log(p);
    }

    const addHandler = () => {
        navigate("/admin/product/add")
    }

    const deleteHandler = async () => {
        try{
            axios.delete(`http://localhost:9090/product/${selectedProduct.id}`, {headers: { 
                'Content-Type': 'application/json'
            }}).then(() => {
                let index = products.indexOf(selectedProduct)
                let temp = [...products]
                temp.splice(index, 1)
                setProducts(temp)
            })
        } catch(err){
            console.error(err);
        }
    }

    const editHandler = () => {
        navigate('/admin/product/edit/' + selectedProduct.id)
    }

    useEffect(() => {
        try {
            // Make an API call to your authentication endpoint (replace with your actual API URL)
            axios.get('http://localhost:9090/product', {headers: { 
                'Content-Type': 'application/json'
            }}).then((response) => {
                setProducts(response.data)
            })
        } catch (error) {
            console.error('API request error:', error);
        }
    }, [])


    return <Card className={style.card}>
        <h1>Products</h1>
        <ProductButtons onAdd={addHandler} onDelete={deleteHandler} onEdit={editHandler} selectedProduct={selectedProduct} />
        <ProductTable products={products} selectChangeHandler={selectChangeHandler} selectedProduct={selectedProduct} />
    </Card>;
}
 
export default Products;