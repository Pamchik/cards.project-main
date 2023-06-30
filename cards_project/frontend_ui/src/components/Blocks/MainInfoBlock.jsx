import React from 'react';

const MainInfoBlock = ({children, ...props}) => {
    return (
        <div className="tabs-general__pane tabs-general__pane_show">
            <div className="general-card-info">
                <div className="general-card-info__main">
                     {children}   
                </div>
            </div>
        </div>
    );
};

export default MainInfoBlock;