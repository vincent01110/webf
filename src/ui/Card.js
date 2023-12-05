import React from "react";
import style from './Card.module.css';

const Card = (props) => {

    const handleClick = () => {
        // Call the prop function if provided
        if (props.onClick) {
            props.onClick();
        }
    };


    return <div className={`${style.card} ${props.className}`} onClick={handleClick}>
        {props.children}
    </div>
}

export default Card;