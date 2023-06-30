import React from 'react';

const BtnBlock = ({children, ...props}) => {
    return (
        <div className="general-card-info__btn">
            {children}
        </div>
    );
};

export default BtnBlock;