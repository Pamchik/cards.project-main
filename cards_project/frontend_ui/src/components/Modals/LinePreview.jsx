import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useNavigate } from 'react-router-dom';
import { API_Url } from '../../App.js';
import axios from "axios";
import DetailButton from '../UI/Button/DetailButton.jsx';
import DotsListGreyMiniButton from '../UI/Button/DotsListGreyMiniButton.jsx';
import ResetIconButton from '../UI/Button/ResetIconButton.jsx';
import { MainModalBtnBlock, MainModalMainBlock, MainModalText, MainModalTopBlock, MainModalView } from './MainModalView.jsx';
import DiscriptionList from '../Blocks/DiscriptionList.jsx';
import PictureBlock from '../Blocks/PictureBlock.jsx';
import BlockInput from '../UI/Input/BlockInput.jsx';

function LinePreview({ isOpen, onClose, selectedID }) {
    
    let currentLineUrl;
    if (window.location.href.includes('/projects/')) {
        currentLineUrl = `${API_Url}/api/projects/`;
    } else if (window.location.href.includes('/orders/')) {
        currentLineUrl = `${API_Url}/api/orders/`;
    } else {
    // Обработка случая, когда используется другой URL
    };

    //  Функция закрытия модального окна
        const handleClose = () => {
            setlineData([]); // очистка переменных
            onClose();
        };

    // Открытие следующей страницы по кнопке "Детальнее"
        const navigate = useNavigate();
        const handleButtonClick = () => {
            navigate(`${selectedID}/`);
        };

    // Константа для статуса загрузки
        const [isLoading, setIsLoading] = useState(true);

    // получение данных исходя из id
        const [lineData, setlineData] = useState([])

        useEffect(() => {
            if (selectedID && currentLineUrl) {
                setIsLoading(true);
                axios({
                    method: "GET",
                    url: `${currentLineUrl}${selectedID}/`,
                }).then(response => {
                    setlineData(response.data)
                    setIsLoading(false);
                });
            }
        }, [selectedID])

        const lineNumber = lineData.number ? lineData.number : ""
        const bankName = lineData.bank ? lineData.bank.name_eng : ""
        const paymentSystem = lineData.payment_system ? lineData.payment_system.name : ""
        const cardCategory = lineData.card_category? lineData.card_category.name : ""
        const cardName = lineData.card_name ? lineData.card_name : ""
        const cardCode = lineData.card_code ? lineData.card_code : ""
        const cardRevision = lineData.card_revision ? lineData.card_revision : ""
        const chipShortName = lineData.chip ? lineData.chip.short_name : ""
        const cardQty = lineData.card_qty ? lineData.card_qty : ""  
        const previewImage = lineData.preview_image ? lineData.preview_image : null 


    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
            {isOpen && (
                <MainModalView onClick={() => handleClose()}>
                    <MainModalTopBlock>
                        <MainModalText title={`Предварительный просмотр`}/>
                        <MainModalBtnBlock>
                            <DetailButton onClick={handleButtonClick}></DetailButton>
                            <DotsListGreyMiniButton></DotsListGreyMiniButton>
                            <ResetIconButton onClick={handleClose}></ResetIconButton>
                        </MainModalBtnBlock>
                    </MainModalTopBlock>
                    <MainModalMainBlock>
                        {/* -------- Рисунок, комментарий -------- */}
                        <div className="general-card-info__info">
                                <PictureBlock previewImage={previewImage}/>

                                <DiscriptionList>    
                                    <BlockInput title={'Номер заказа'}
                                        myStyle={{ marginTop: '15px' }}
                                        type='text'
                                        value={lineNumber}
                                        readOnly
                                    >    
                                    </BlockInput>
                                    
                                    <BlockInput title={'Количество в заказе'}
                                        myStyle={{ marginTop: '15px' }}
                                        type='text'
                                        value={cardQty}
                                        readOnly
                                    >    
                                    </BlockInput>
                                        
                                </DiscriptionList>
                                
                                <DiscriptionList>   

                                    <BlockInput title={'Имя Банка'}
                                        myStyle={{ marginTop: '15px' }}
                                        type='text'
                                        value={bankName}
                                        readOnly
                                    >    
                                    </BlockInput>

                                    <BlockInput title={'Название карты'}
                                        myStyle={{ marginTop: '15px' }}
                                        type='text'
                                        value={`${paymentSystem} ${cardCategory} ${cardName}`}
                                        readOnly
                                    >    
                                    </BlockInput>

                                    <BlockInput title={'Номер карты'}
                                        myStyle={{ marginTop: '15px' }}
                                        type='text'
                                        value={`${cardCode} ${cardRevision}`}
                                        readOnly
                                    >    
                                    </BlockInput>

                                </DiscriptionList>     

                                <DiscriptionList>

                                    <BlockInput title={'Название чипа'}
                                        myStyle={{ marginTop: '15px' }}
                                        type='text'
                                        value={chipShortName}
                                        readOnly
                                    >    
                                    </BlockInput>

                                </DiscriptionList>
                        </div>
                    </MainModalMainBlock>
                </MainModalView>

            )}
            </>
        );
    }
}

export default LinePreview;
