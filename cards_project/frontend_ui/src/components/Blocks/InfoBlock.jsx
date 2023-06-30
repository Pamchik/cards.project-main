import React from 'react';

const InfoBlock = ({children, ...props}) => {
    return (
<           div className="general-card-info__info">
                {children}
            </div>   
    );
};

export default InfoBlock;