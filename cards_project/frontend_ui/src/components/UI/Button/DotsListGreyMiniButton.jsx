import React from 'react';

const DotsListGreyMiniButton = ({...props}) => {
    return (
        <div className="dropdown">
            <button {...props} className="btn btn_dots-list-grey-mini"
                data-toggle="dropdown">...</button>
            <ul className="dropdown__content">
                <li><a className="dropdown__text"
                        href="#">1</a></li>
                <li><a className="dropdown__text"
                        href="#">2</a></li>
                <li><a className="dropdown__text"
                        href="#">3</a></li>
            </ul>
        </div>
    );
};

export default DotsListGreyMiniButton;
