import React from 'react';

const UserDropButton = ({...props}) => {
    return (
        <div className="navbar__user-btn">
            <div className="dropdown">
                <button className="btn btn_user-drop" data-toggle="dropdown"><svg /></button>
                <ul className="dropdown__content">
                    <li><a className="dropdown__text">Профиль</a></li>
                    <li><a className="dropdown__text">Выйти</a></li>
                </ul>
            </div>
        </div>
    );
};

export default UserDropButton;

