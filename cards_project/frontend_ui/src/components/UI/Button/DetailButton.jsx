import React from 'react';

const DetailButton = ({...props}) => {
    return (
        <button {...props} className='btn btn_detail'>
            Детальнее
        </button>
    );
};

export default DetailButton;