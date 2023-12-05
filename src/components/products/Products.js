import React from 'react';
import Card from '../../ui/Card';
import style from './Products.module.css';
import ProductTable from './product-table/ProductTable';


const Products = () => {
    return <Card className={style.card}>
        <ProductTable/>
    </Card>;
}
 
export default Products;