/** @type {import('ag-grid-community').GridOptions} */


// Вкладка с исходниками
const inputPicTableOptions = {
    columnDefs: [
    ],
  };

  document.addEventListener('DOMContentLoaded', function () {
    var inputPicTableDiv = document.querySelector('#inputPicTable');
    new agGrid.Grid(inputPicTableDiv, inputPicTableOptions);
  
    fetch('../../static/json/table.json')
    .then(function (response) {
    
      return response.json();
      
    }).then(function (data) { 
        const colDefs = inputPicTableOptions.api.getColumnDefs();
        colDefs.length=0;
        const keys = Object.keys(data[0])
        keys.forEach(key => colDefs.push({field : key, filter: 'agMultiColumnFilter',filterParams: {filters: [{filter: 'agTextColumnFilter',display: 'subMenu',},{filter: 'agSetColumnFilter',},],},}));
        inputPicTableOptions.api.setColumnDefs(colDefs);
        inputPicTableOptions.api.setRowData(data);
    })
  });


// Вкладка с КП
const offerTableOptions = {
  columnDefs: [
  ],
};  

    document.addEventListener('DOMContentLoaded', function () {
      var offerTableDiv = document.querySelector('#offerTable');
      new agGrid.Grid(offerTableDiv, offerTableOptions);
    
      fetch('../../static/json/table copy.json')
      .then(function (response) {
    
        return response.json();
        
      }).then(function (data) { 
          const colDefs = offerTableOptions.api.getColumnDefs();
          colDefs.length=0;
          const keys = Object.keys(data[0])
          keys.forEach(key => colDefs.push({field : key, filter: 'agMultiColumnFilter',filterParams: {filters: [{filter: 'agTextColumnFilter',display: 'subMenu',},{filter: 'agSetColumnFilter',},],},}));
          offerTableOptions.api.setColumnDefs(colDefs);
          offerTableOptions.api.setRowData(data);
      })
    });
  