import React from 'react';

const NewFileAddButton = ({...props}) => {
    return (
        <button {...props} className='btn btn_new-file-add'>
            Добавить новый файл
        </button>
    );
};

export default NewFileAddButton;