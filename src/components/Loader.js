import React from 'react';
import classes from './Loader.module.css';
import { createPortal } from 'react-dom';


const Loader = () => {
    return (
        <div className={classes.loader_container}>
            <div className={classes.loader}></div>
        </div>
    )
}

const portalElement = document.getElementById('loader');
createPortal(<Loader/>, portalElement)

export default Loader;