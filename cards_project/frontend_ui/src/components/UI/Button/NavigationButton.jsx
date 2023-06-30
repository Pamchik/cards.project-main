import React from 'react';

const NavigationButton = ({title, activeTab, numberTab, onClick, ...props}) => {

    const newStyle = activeTab === numberTab ? 'tabs-general__btn_active' : '';

    return (
        <button 
            className={`tabs-general__btn ${newStyle}`}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default NavigationButton;