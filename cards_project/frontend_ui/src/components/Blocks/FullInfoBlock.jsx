import React from 'react';

const FullInfoBlock = ({children, ...props}) => {
    return (
        <div className="general-card-info__full-info">
            {children}
        </div>
    );
};

export default FullInfoBlock;