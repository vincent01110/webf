import React from 'react';
import style from './CollectionListItem.module.css';

const CollectionListItem = (props) => {


    return <li onClick={props.onClick}>
        <div className={`${style.item} ${props.selected === props.collection.id && style.selected}`}>
            {`${props.collection.id} - ${props.collection.name}`}
        </div>
    </li>;
}
 
export default CollectionListItem;