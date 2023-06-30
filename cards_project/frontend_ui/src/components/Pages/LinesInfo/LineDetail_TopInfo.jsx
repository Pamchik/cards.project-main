import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import BlockSelect from "../../UI/Select/BlockSelect";
import SubmitIconButton from "../../UI/Button/SubmitIconButton";
import ResetIconButton from "../../UI/Button/ResetIconButton";
import { fetchChipColorAPI } from "../../API/GetLinesData";

function LineDetail_TopInfo({
    lineData,
    selectedID,
    currentLineUrl,
    updateAllLineData,
}) {

    useEffect(() => {
        fetchStatusList()
    }, [])  

    // Получение списка по статусам
        const [statusList, setStatusList] = useState([])
        function fetchStatusList() {
            const list = [
                {id: 1, value: "Запущен"},
                {id: 2, value: "Приостановлен"},
                {id: 3, value: "Закрыт"},
            ]
            setStatusList(list)
        }  

    // Создание списка с изменненными данными
        const [lineFields, setLineFields] = useState({})

        useEffect(() => {
            fieldsEmpty()
        }, []);

        function fieldsEmpty() {
            setLineFields({
                general_line_status: lineData.general_line_status,
            }) 
        } 


    // Функция сохранения/обновления данных на сервере
        const handleStatusSave = async () => {     
            const updateLineData = {
                    general_line_status: lineFields.general_line_status,
            };
            try {
                const { data } = axios.put(`${currentLineUrl}${selectedID}/`, updateLineData);
            } catch (error) {}
        };    

    // Функция возврата статуса (отмена действия)
        // const handleStatusReset = () => {
        //     updateAllLineData()
        // };


    return (
        <div className="top-block">
            <div className="top-block__order-info">
                <p className="top-block__order-title">
                    {lineData.number} - {lineData.bank.name_eng} {lineData.payment_system.name} {lineData.card_category.name} {lineData.card_name}
                </p>
            </div>

            <div className="top-block__status">
                <p className="top-block__label">Статус</p>
                <BlockSelect 
                    myStyle={{ marginRight: '10px',  width: '200px', textAlignLast: 'center' }}
                    myStyleField={{height: '20px'}}
                    value={lineFields.general_line_status}
                    onChange={e => setLineFields({general_line_status: e})}
                    defaultValue={lineFields.general_line_status}
                    options={statusList}
                >
                </BlockSelect>
                <SubmitIconButton onClick={handleStatusSave}></SubmitIconButton>
                {/* <ResetIconButton onClick={handleStatusReset}></ResetIconButton> */}
            </div>
        </div>
    )
}

export default LineDetail_TopInfo