import React from 'react';
import Draggable from 'react-draggable';

const MainModalView = ({children, onClick, myStyle}) => {
    return (
        <div className="modal-window">
        <div className="modal-window__overlay" onClick={onClick}></div>
        <Draggable handle=".modal-window__modal-name-text">
        <div className="modal-window__content" style={myStyle}>
            {children}
        </div>   
        </Draggable> 
    </div>       
    );
};

const MainModalTopBlock = ({children}) => {
    return (
        <div className="modal-window__top-block">
            {children}
        </div>      
    );
};

const MainModalText = ({title}) => {
    return (
        <div className="modal-window__modal-name-text">
            {title}
        </div>            
    );
};

const MainModalBtnBlock = ({children}) => {
    return (          
        <div className="modal-window__btn-block">
            {children}
        </div>
    );
};

const MainModalMainBlock = ({children}) => {
    return (   
        <div className="modal-window__main-block">
            {children}
        </div>     
    );
};


export { MainModalView, MainModalTopBlock, MainModalText, MainModalBtnBlock, MainModalMainBlock };