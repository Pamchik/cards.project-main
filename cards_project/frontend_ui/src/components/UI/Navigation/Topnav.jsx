import React, { useState } from 'react';
import AddButton from '../Button/AddButton'
import CreateNewLine from '../../Modals/CreateNewLine'
import GereralUserInfo from '../../Users/GereralUserInfo'
import UserDropButton from '../../Users/UserDropButton'


function Topnav({ activeLink }) {

    // Открытие модального окна для создания новой линии
        const [isCreateNewLineOpen, setIsCreateNewLineOpen] = useState(false);

        const openCreateNewLine = () => {
            setIsCreateNewLineOpen(true);
        };

        const closeCreateNewLine = () => {
            setIsCreateNewLineOpen(false);
        };
    
    // Проверка, что страница "projects" или "orders"    
        const [isPageCorrect, setIsPageCorrect] = useState(true)
        const pageChecking = (pageStatus) => {
            setIsPageCorrect(pageStatus)
        }

  return (
    <div className="navbar">
        <div className="navbar__row">
            <div className="navbar__block-btn" >
                <AddButton 
                    activeLink={activeLink}
                    pageChecking={pageChecking}
                    onClick={openCreateNewLine}
                >
                </AddButton>
                <CreateNewLine 
                    isOpen={isCreateNewLineOpen} 
                    onClose={closeCreateNewLine}
                >
                </CreateNewLine>
            </div>
            <div className="navbar__user">
                <GereralUserInfo></GereralUserInfo>
                <UserDropButton></UserDropButton>
            </div>
        </div>
    </div>
  );
}

export default Topnav;
