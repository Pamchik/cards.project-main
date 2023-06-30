import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community//styles/ag-grid.css';
import 'ag-grid-community//styles/ag-theme-alpine.css';
import axios from 'axios';
import { API_Url } from '../../App.js';

import 'ag-grid-enterprise';
import {useState, useRef, useEffect, useMemo} from 'react';

function GeneralTable() {

  const gridRef = useRef();
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([

        { field: 'slug', filter: 'agMultiColumnFilter' },
        { field: 'bank_name_eng',  filter: 'agMultiColumnFilter' },
        { field: 'payment_system', filter: 'agMultiColumnFilter' },
        { field: 'card_category', filter: 'agMultiColumnFilter' },
        { field: 'card_name',  filter: 'agMultiColumnFilter' },
        { field: 'card_quality',  filter: 'agMultiColumnFilter' },
        { field: 'chip_name',  filter: 'agMultiColumnFilter' },
        { field: 'chip_full_name', filter: 'agMultiColumnFilter' },
        { field: 'chip_color',  filter: 'agMultiColumnFilter' },
        { field: 'plastic_type', filter: 'agMultiColumnFilter' },
        { field: 'plastic_color', filter: 'agMultiColumnFilter' },
        { field: 'magstripe_color',  filter: 'agMultiColumnFilter' },
        { field: 'put_date', filter: 'agMultiColumnFilter' },
        { field: 'in_archive',  filter: 'agMultiColumnFilter' }
  ]); 
  const defaultColDef = useMemo( ()=> ( {
    flex: 1,

  }), []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API_Url}/api/orders/`,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        setRowData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
        <div style={{height: '100%'}}>
          <div className="ag-theme-alpine" style={{height: '100%'}}>
            <AgGridReact ref={gridRef}
                rowData={rowData} animateRows={true} 
                columnDefs={columnDefs} defaultColDef={defaultColDef}          
                />
          </div>
        </div>        
  );
}


export default GeneralTable;