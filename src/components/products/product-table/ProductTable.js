import React from 'react';
import style from './ProductTable.module.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ProductTable = (props) => {

    const columns = [
        {field: 'id', header: 'Id'},
        {field: 'name', header: 'Name'},
        {field: 'category', header: 'Category'},
        {field: 'price', header: 'Price'},
        {field: 'discountedPrice', header: 'Discounted Price'},
    ];


    return <DataTable paginator paginatorClassName={style.paginator} rows={10} cellClassName={style.cell} rowClassName={style.row} 
    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    selectionMode="single"  selection={props.selectedProduct} onSelectionChange={(e) => props.selectChangeHandler(e.value)}
    dataKey="id" removableSort={true} value={props.products} tableStyle={{ minWidth: '50rem' }}>
        {columns.map((col, i) => (
            <Column key={col.field} sortable field={col.field} header={col.header} />
        ))}
    </DataTable>
}
 
export default ProductTable;