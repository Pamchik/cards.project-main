import React from 'react';
import { useState, useEffect } from 'react';

const AddButton = ({pageChecking, activeLink, ...props}) => {
    const [classButton, setClassButton] = useState('')
    useEffect(() => {
        if (activeLink === '/projects/' || activeLink === '/orders/') {
            setClassButton('btn btn_add bi bi-plus-circle')
            pageChecking(true)
        } else {
            setClassButton('btn btn_add disabled')
            pageChecking(false)
        }
    }, [activeLink])

    return (
        <button {...props} className={classButton}>
            <p>Создать...</p>
            <svg />
        </button>
    );
};

export default AddButton;