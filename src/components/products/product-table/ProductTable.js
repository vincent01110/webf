import React, {useState, useEffect} from 'react';
import style from './ProductTable.module.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

const ProductTable = () => {
    const [products, setProducts] = useState()

    const columns = [
        {field: 'id', header: 'Id'},
        {field: 'name', header: 'Name'},
        {field: 'category', header: 'Category'},
        {field: 'price', header: 'Price'},
        {field: 'discountedPrice', header: 'Discounted Price'},
    ];

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

    return <DataTable paginator paginatorClassName={style.paginator} rows={10} cellClassName={style.cell} rowClassName={style.row} 
    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    selectionMode="single"
    dataKey="id" removableSort={true} value={products} tableStyle={{ minWidth: '50rem' }}>
        {columns.map((col, i) => (
            <Column key={col.field} sortable field={col.field} header={col.header} />
        ))}
    </DataTable>
}
 
export default ProductTable;