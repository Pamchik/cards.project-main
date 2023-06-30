import React, { useState } from "react";
import GeneralInfo from '../../Pages/LinesInfo/GeneralInfo/GeneralInfo';
import ListSteps from '../../Pages/LinesInfo/DataInfo/ListSteps';
import ProcessScheme from './ProcessScheme/ProcessScheme';
import NavigationButton from "../../UI/Button/NavigationButton";


function LineDetail_BottomBlock({
    selectedID,
    currentLineUrl,
    line_type,
    lineData,
    updateAllLineData
}) {

    // открытие вкладок на странице
        const [activeTab, setActiveTab] = useState(0);                  // Состояние для отслеживания активной вкладки
        const handleTabClick = (index) => {
            setActiveTab(index);                                        // Обновляем активную вкладку при нажатии кнопки
        };

    
    return (
            
        <div className="bottom-block">
            <div className="tabs-general">

                <div className="tabs-general__nav">

                    {/* -------- Навигационные кнопки -------- */}
                    <NavigationButton
                        title={'Общее'}
                        activeTab={activeTab}
                        numberTab={0}
                        onClick={() => handleTabClick(0)}
                    ></NavigationButton>
                    <NavigationButton
                        title={'Данные'}
                        activeTab={activeTab}
                        numberTab={1}
                        onClick={() => handleTabClick(1)}
                    ></NavigationButton>
                    <NavigationButton
                        title={'Схема процесса'}
                        activeTab={activeTab}
                        numberTab={2}
                        onClick={() => handleTabClick(2)}
                    ></NavigationButton>
                </div>
                
                <div className="tabs-general__content">
                    {/* -------- Контент по вкладкам --------  */}
                    {activeTab === 0 
                    ? <GeneralInfo 
                        lineData={lineData}
                        selectedID={selectedID}
                        currentLineUrl={currentLineUrl}
                        updateAllLineData={updateAllLineData}
                        line_type={line_type}
                    /> 
                    : ''}
                    {activeTab === 1 
                    ? <ListSteps 
                        selectedID={selectedID}
                        currentLineUrl={currentLineUrl}
                        line_type={line_type}
                    /> 
                    : ''}
                    {activeTab === 2 
                    ? <ProcessScheme /> 
                    : ''}
                </div>
            </div>
        </div>
    )
}

export default LineDetail_BottomBlock