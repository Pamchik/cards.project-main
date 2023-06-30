import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import LineDetail_TopInfo from './LineDetail_TopInfo';
import LineDetail_BottomBlock from './LineDetail_BottomBlock';
import { API_Url } from '../../../App.js';

function LineDetail() {
    
    let currentLineUrl;
    let line_type;
    if (window.location.href.includes('/projects/')) {
        line_type = 'projects'
        currentLineUrl = `${API_Url}/api/${line_type}/`;
    } else if (window.location.href.includes('/orders/')) {
        line_type = 'orders'
        currentLineUrl = `${API_Url}/api/${line_type}/`;
    } else {
    // Обработка случая, когда используется другой URL
    };


    // Константа для статуса загрузки
        const [isLoading, setIsLoading] = useState(true);

    // получение данных исходя из id
        const { selectedID } = useParams();
        const [lineData, setlineData] = useState([])

        useEffect(() => {
            fetchData()
        }, [selectedID])

        function fetchData() {
            if (selectedID && currentLineUrl) {
                setIsLoading(true);
                axios({
                    method: "GET",
                    url: `${currentLineUrl}${selectedID}/`,
                }).then(response => {
                    setlineData(response.data);
                    setIsLoading(false);
                });
            }
        }

    // Получение запроса из другого компонента на обновление данных
        const updateAllLineData = () => {
            fetchData()
        }


    if (isLoading) {
        return <div>Loading...</div>;
    } else {
        return (
                <div className="detailed-product-card">
                    {/* -------- Верхняя панель с информацией по карте -------- */}
                    <LineDetail_TopInfo 
                        lineData={lineData}
                        selectedID={selectedID}
                        currentLineUrl={currentLineUrl}
                        updateAllLineData={updateAllLineData}
                    />

                    {/* -------- Нижняя панель с данными по карте -------- */}
                    <LineDetail_BottomBlock 
                        lineData={lineData}
                        selectedID={selectedID}
                        currentLineUrl={currentLineUrl}
                        line_type={line_type}
                        updateAllLineData={updateAllLineData}
                    />

                </div>
        )
    }
}
export default LineDetail