import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { API_Url } from '../../App.js';
import LinePreview from "../Modals/LinePreview";


function GeneralTable() {

  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', filter: 'agMultiColumnFilter', width: 100, minWidth: 100, headerName: 'ID' },
    { field: 'number', filter: 'agMultiColumnFilter', width: 100, minWidth: 100, headerName: 'Номер' },
    { field: 'bank.name_eng',  filter: 'agMultiColumnFilter', width: 200, minWidth: 200, headerName: 'Банк' },
    { field: 'payment_system.name', filter: 'agMultiColumnFilter', width: 100, minWidth: 200, headerName: 'ПС' },
    { field: 'card_category.name', filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Категория' },
    { field: 'card_name',  filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Название карты' },
    { field: 'card_quality',  filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Количество' },
    { field: 'chip.short_name',  filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Чип' },
    { field: 'chip_color.name',  filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Цвет чипа' },
    { field: 'material_type.name', filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Тип материала' },
    { field: 'material_color.name', filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Цвет материала' },
    { field: 'magstripe_color.name',  filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Цвет магнитной полосы' },
    { field: 'created_date', filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'Дата создания' },
    { field: 'in_archive',  filter: 'agMultiColumnFilter', minWidth: 100, headerName: 'В архиве' }
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  // получение данных для таблицы
  const onGridReady = useCallback((params) => {
    fetch(`${API_Url}/api/projects/`)
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  // Открытие модального окна для предпросмотра
  const [isLinePreviewOpen, setIsLinePreviewOpen] = useState(false);
  const closeLinePreview = () => {
    setIsLinePreviewOpen(false);
  };


  // Функция получения данных по двойному нажатию на строку в таблице
  const [selectedID, setSelectedID] = useState('');
  const onRowDoubleClicked = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows(); // получения всех данных из таблицы по выбранной строке
    setIsLinePreviewOpen(true); // открытие модального окна
    setSelectedID(selectedRows[0].id); // передача значения ID в переменную для последующей работы в модальном окне

  }, []);


  return (
    <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={'single'}
            onGridReady={onGridReady}
            onRowDoubleClicked={onRowDoubleClicked}
          ></AgGridReact>
          <LinePreview 
            isOpen={isLinePreviewOpen} 
            onClose={closeLinePreview}
            selectedID={selectedID}
          ></LinePreview>
        </div>
    </div>
  );
};


export default GeneralTable;