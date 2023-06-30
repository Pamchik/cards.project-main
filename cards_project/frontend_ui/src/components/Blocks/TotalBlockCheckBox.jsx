import React from 'react';

const TotalBlockCheckBox = ({children, title, myStyle, ...props}) => {
    return (
        <div className="text-field" >
            <label className="text-field__label">{title}</label>
            <div className="text-field__block-checkbox" style={myStyle}>
                {children}
            </div>
        </div>
    );
};

export default TotalBlockCheckBox;