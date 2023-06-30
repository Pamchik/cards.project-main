import { useState, useRef } from 'react';
import React from 'react';
import Tippy from '@tippyjs/react';
import { API_Url } from '../../App.js';  
import axios from "axios";



const PopupCellMenu = (props) => {
  const tippyRef = useRef();
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const fileId = props.node.data.id;                                                  // определение ID файла
  const fileStatus = props.node.data.status;                                          // определение статуса файла
  const fileName = props.node.data.name;                                              // определение имени для файла
  const rowFile = props.node.data.file;                                               // директория расположения файла
  const putUrl = `${API_Url}/api/files/${fileId}/`                              // url для получения обновленных данных
  
  
  const dropDownContent = (
    <div className="dropdown__content dropdown__content_table">
      <div onClick={() => onClickHandler('download')} className="dropdown__text">
        Скачать
      </div>
      <div 
        onClick={() => onClickHandler('active')} 
        className={`dropdown__text ${fileStatus === 'Активен' ? 'disabled' : ''}`}
      >
        Активен
      </div>
      <div 
        onClick={() => onClickHandler('in_archive')} 
        className={`dropdown__text ${fileStatus === 'В архиве' ? 'disabled' : ''}`}
      >
        В архив
      </div>


    </div>
  );

  const onClickHandler = (option) => {
    hide();

    // функция скачивания файла
    if (option === 'download') {
      fetch(rowFile)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Ошибка при скачивании файла:', error);
      });
    }
    // функция изменения статуса на "В архиве"
    if (option === 'in_archive') {
        const onClickResolve = () => {
          axios
            .patch(putUrl, { status: "В архиве" },)
            .then(response => {
              console.log('Запрос выполнен успешно');
              props.updateTableData();
              // Дополнительные действия после успешного выполнения запроса
            })
            .catch(error => {
              console.error('Ошибка при выполнении запроса', error);
            });
        };
        onClickResolve()       
    }
    // функция изменения статуса на "Активен"
    if (option === 'active') {
      const onClickResolve = () => {
        axios
          .patch(putUrl, { status: "Активен" },)
          .then(response => {
            console.log('Запрос выполнен успешно');
            props.updateTableData();
            // Дополнительные действия после успешного выполнения запроса
          })
          .catch(error => {
            console.error('Ошибка при выполнении запроса', error);
          });
      };
      onClickResolve()       
  }
  };

  return (
    <Tippy
      ref={tippyRef}
      content={dropDownContent}
      visible={visible}
      onClickOutside={hide}
      allowHTML={true}
      arrow={false}
      appendTo={document.body}
      interactive={true}
      placement="right"
    >
      <button className="btn btn_dots-list" onClick={visible ? hide : show}>
        ...
      </button>
    </Tippy>
  );
};

export default PopupCellMenu;
