import React from 'react';

const SubmitButton = ({...props}) => {
    return (
        <button {...props} className='btn btn_submit'>
            Сохранить
        </button>
    );
};

export default SubmitButton;