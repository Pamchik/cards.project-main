import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { API_Url } from '../../../../App.js';
import PopupCellMenu from '../../../Tables/PopupCellMenu';
import FileAdd from "../../../Modals/FileAdd";
import SubmitButton from '../../../UI/Button/SubmitButton';
import NewFileAddButton from '../../../UI/Button/NewFileAddButton';
import RepeatIconButton from '../../../UI/Button/RepeatIconButton';
import DotsListGreyMiniButton from '../../../UI/Button/DotsListGreyMiniButton';
import { fetchFilesAPI, fetchProcessDataAPI } from '../../../API/GetLinesData.js';


// -------- Исходник --------
function ProcessStep({ 
    handleSpoilerClick, 
    selectedID,
    currentLineUrl,
    line_type,
    urlComponentName,
    componentName
}) {


    // Открытие/закрытие модального окна для создания нового файла
        const [isFormFileAddOpen, setIsFormFileAddOpen] = useState(false);
        const openFormFileAdd = () => {
            setIsFormFileAddOpen(true);   
        };
        const closeFormFileAdd = () => {
            setIsFormFileAddOpen(false);
        };

    // получение данных (статус, комментарии) при загрузки компонента
        const [stepDefaultData, setStepDefaultData] = useState([]);
        const [selectedStatus, setStatus] = useState('');
        const [stepСomment, setStepComment] = useState('')

        const receiveComponentData = () => {
            async function fetchProcessData() {
                const list = await fetchProcessDataAPI.getAll(parseInt(selectedID, 10), urlComponentName, line_type); 
                setStepDefaultData(list)
                console.log(list)
                if (list.length > 0) {
                    setStatus(list[0].step_status);
                    setStepComment(list[0].step_comment);
                } else {
                    setStatus('Wait');
                    setStepComment('');
                }
            }
            fetchProcessData()            
        }

        useEffect(() => {   
            receiveComponentData()
        }, []);

    // Функция отправки данных на сервер
        const [processData, setProcessData] = useState([]);

    // Функция сохранения данных в таблицу
        const handleSaveInfo = async () => {
            if (stepDefaultData.length > 0) {
                const updatedData = {
                    step_status: selectedStatus,
                    step_comment: stepСomment
                };
                const elementId = stepDefaultData[0].id
                await axios.patch(`${API_Url}/api/process-data/${elementId}/`, updatedData);
            } else {
                const saveInfoProcess = {
                    line_type: line_type,
                    line_number: selectedID,
                    process_step: urlComponentName,
                    step_status: selectedStatus,
                    step_comment: stepСomment,
                };
                const { data } = await axios.post(`${API_Url}/api/process-data/`, saveInfoProcess);
                setProcessData([...processData, data]);
            }  
        };

    // Изменение цвета левой панели с нумерацией в зависимости от статуса
        const handleStatusChange = (event) => {
        setStatus(event.target.value);                                                      
        };

    // Получение данных в таблицу
        const [rowData, setRowData] = useState();
        const onGridReady = useCallback(() => {  
            async function fetchPreview() {
                const list = await fetchFilesAPI.getAll(parseInt(selectedID, 10), urlComponentName, line_type); 
                setRowData(list)
            }
            fetchPreview()            
        }, []);

    // Функция обновления данных таблицы
        const updateTableData = useCallback((newData) => {
            onGridReady();                                                                     
        }, []);

    // Функция обновления данных всего блока
        const updateBlockInfo = async () => {
            onGridReady ();
            receiveComponentData();
        };

    // настройка базовых параметров отображения таблицы
        const gridRef = useRef();
        const containerStyle = useMemo(() => ({ width: '100%', height: '300px' }), []);
        const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
        const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
        };
        }, []);

    // константы для передачи данных в кнопки, созданные в строках
        const getRowId = useCallback((params) => params.data.id, []);                       // получение id
        const getRowFile = useCallback((params) => params.data.file, []);                   // получение относительного пути файла
        const getRowFileName = useCallback((params) => params.data.name, []);               // получение названия файла
  
    // настраиваемые поля таблицы
        const [columnDefs, setColumnDefs] = useState([
            { 
                headerName: 'Название файла',
                field: 'name', 
                sortable: 'true', 
                filter: 'agMultiColumnFilter',
            },
            { 
                headerName: 'Формат',
                field: 'file_extension', 
                sortable: 'true', 
                filter: 'agMultiColumnFilter',
                maxWidth: 120,
            },
            {
                headerName: 'Дата', 
                field: 'created_date', 
                sortable: 'true',
                sort: 'desc',
                maxWidth: 150,
                valueFormatter: function (params) {             
                    return moment(params.value).format('MM.DD.YYYY HH:mm');                 // изменение формата отображаемой даты
                },
            },
            { 
                headerName: 'Статус',
                field: 'status', 
                sortable: 'true', 
                filter: 'agMultiColumnFilter',
                maxWidth: 150,
            },
            {
                headerName: '',
                colId: 'action',
                cellRenderer: PopupCellMenu,                                                // генерация кнопок внутри таблицы
                pinned: 'right',
                editable: false,
                maxWidth: 100,
                filter: false,
                cellRendererParams: {                                                        // передача переменных
                    selectedID: selectedID,                                                     
                    getRowId: getRowId,                                                         
                    getRowFile: getRowFile,                                                     
                    getRowFileName: getRowFileName,                                             
                    updateTableData: updateTableData,    
                    urlComponentName: urlComponentName,                                       
                }
            },
        ]);


    return (
        <div className={`spoiler-num-cycle__item spoiler-num-cycle__item_${selectedStatus.toLowerCase()}`} key={componentName}>
            <div className="spoiler-num-cycle__title" onClick={handleSpoilerClick}>{componentName}</div>
            <div className="spoiler-num-cycle__block">
                <div className="spoiler-num-cycle__block-content">
                    <div className="document-control-form">
                        <div className="document-control-form__btn-block">
                            <SubmitButton onClick={handleSaveInfo}></SubmitButton>
                            <NewFileAddButton onClick={openFormFileAdd}></NewFileAddButton>
                            <FileAdd 
                                isOpen={isFormFileAddOpen} 
                                onClose={closeFormFileAdd}
                                selectedID={selectedID}
                                updateTableData={updateTableData}
                                urlComponentName={urlComponentName}
                                line_type={line_type}
                            >
                            </FileAdd>
                            <RepeatIconButton onClick={updateBlockInfo}></RepeatIconButton>
                            <DotsListGreyMiniButton></DotsListGreyMiniButton>
                        </div>

                        <div
                            className="document-control-form__status-file-comment-block">
                            <div className="document-control-form__status">
                                <div className="text-field text-field_full-margin-5">
                                    <label for="input-pic-status" className="text-field__label">Статус</label>
                                    <select name="input-pic-status"
                                        id="input-pic-status"
                                        className="text-field__select"
                                        value={selectedStatus}
                                        onChange={handleStatusChange}>
                                        <option value="Wait">Ожидание
                                        </option>
                                        <option value="Progress">В процессе
                                        </option>
                                        <option value="Completed">Завершено
                                        </option>
                                    </select>
                                </div>
                                <div className="text-field text-field_full-margin-5 text-field_w38-percent">
                                    <label className="text-field__label">Дата изменения</label>
                                    <input 
                                        type="text"
                                        className="text-field__input"
                                        name="input-pic-status-last-changed"
                                        value="22.06.2023"
                                        readOnly />
                                </div>
                            </div>
                            <div className="document-control-form__comment">
                                <div className="text-field text-field_top-margin-5">
                                    <label className="text-field__label">Комментарий</label>
                                    <textarea
                                        className="text-field__textarea text-field__textarea_resize-not"
                                        name="order-comment"
                                        rows="3"
                                        value={stepСomment}
                                        onChange={(e) => setStepComment(e.target.value)}
                                        ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Таблица с данными     */}
                        <div className="document-control-form__table-block">
                            <div style={containerStyle}>
                                <div style={gridStyle} className="ag-theme-alpine">
                                <AgGridReact
                                    ref={gridRef}
                                    rowData={rowData}
                                    columnDefs={columnDefs}
                                    defaultColDef={defaultColDef}
                                    rowSelection={'single'}
                                    onGridReady={onGridReady}
                                    filter={false}
                                ></AgGridReact>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    )
}

export default ProcessStep