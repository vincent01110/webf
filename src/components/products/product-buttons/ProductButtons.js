import React, {useRef} from 'react';
import style from './ProductButtons.module.css';
import Button from '../../../ui/Button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';


const ProductButtons = (props) => {

    const toast = useRef(null)

    const addHandler = () => {
        props.onAdd()
    }

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Deleted', detail: 'You have deleted product id:' + props.selectedProduct.id, life: 3000 });
        props.onDelete()
    };

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const deleteHandler = (event) => {
        if (!props.selectedProduct) {
            toast.current.show({ severity: 'info', summary: 'Invalid', detail: 'Please select a product', life: 3000 })
        } else {
            confirmPopup({
                target: event.currentTarget,
                message: `Do you want to delete product id:${props.selectedProduct.id}?`,
                acceptClassName: 'delete',
                className: 'popup',
                accept,
                reject
            });
        }
    }

    const editHandler = () => {
        if (!props.selectedProduct) {
            toast.current.show({ severity: 'info', summary: 'Invalid', detail: 'Please select a product', life: 3000 })
        } else {
            props.onEdit()
        }
    }



    return <div className={style.buttons}>
        <Toast ref={toast} className={style.toast} />
        <ConfirmPopup className={style.popup} />
        <Button onClick={addHandler} className={style.add}><svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1em" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" /></svg></Button>
        <Button onClick={editHandler} className={style.edit}><svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1em" viewBox="0 0 512 512"><path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" /></svg></Button>
        <Button onClick={deleteHandler} className={style.delete}><svg xmlns="http://www.w3.org/2000/svg" fill="white" height="1em" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" /></svg></Button>
    </div>;
}
 
export default ProductButtons;