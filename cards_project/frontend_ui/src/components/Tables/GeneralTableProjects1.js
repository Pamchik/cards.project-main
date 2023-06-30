import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community//styles/ag-grid.css';
import 'ag-grid-community//styles/ag-theme-alpine.css';
import axios from 'axios';
import { API_Url } from '../../App.js';

import 'ag-grid-enterprise';
import {useState, useRef, useEffect, useMemo} from 'react';

function GeneralTable() {

  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([

        { field: 'slug', filter: 'agMultiColumnFilter', width: 100, minWidth: 100},
        { field: 'bank_name_eng.name',  filter: 'agMultiColumnFilter', width: 200, minWidth: 200 },
        { field: 'payment_system', filter: 'agMultiColumnFilter', width: 100, minWidth: 200 },
        { field: 'card_category', filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'card_name',  filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'card_quality',  filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'chip_name',  filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'chip_full_name', filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'chip_color',  filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'plastic_type', filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'plastic_color', filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'magstripe_color',  filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'put_date', filter: 'agMultiColumnFilter', minWidth: 100 },
        { field: 'in_archive',  filter: 'agMultiColumnFilter', minWidth: 100 }
  ]); 
  const defaultColDef = useMemo( ()=>  {
    // flex: 1,
    return {
      sortable: true,
      resizable: true,
      // width: 100,
      maxWidth: 350, 
      // suppressSizeToFit: true,
      // suppressSizeToFit: true,
      // enableRowGroup: true,
      // enablePivot: true,
      // enableValue: true,
      // suppressMovable: true,
      // suppressDragLeaveHidesColumns: false,
      suppressMovable: true,

    };

  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: `${API_Url}/api/projects/`,
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
            <AgGridReact 
                ref={gridRef}
                rowData={rowData} 
                animateRows={true} 
                columnDefs={columnDefs} 
                defaultColDef={defaultColDef}          
            />
          </div>
        </div>        
  );
}


export default GeneralTable;