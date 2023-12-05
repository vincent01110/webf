import React from "react";
import style from './Button.module.css';

const Button = props => {
    return <button className={`${style.button} ${props.className}`} type={props.type || 'button'} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
    </button>
}

export default Button;