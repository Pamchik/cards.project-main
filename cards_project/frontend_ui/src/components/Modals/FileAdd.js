import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { API_Url } from '../../App.js';
import SubmitButton from '../UI/Button/SubmitButton.jsx';
import ResetIconButton from '../UI/Button/ResetIconButton.jsx';
import { MainModalBtnBlock, MainModalMainBlock, MainModalText, MainModalTopBlock, MainModalView } from './MainModalView.jsx';

function FileAdd({ 
    isOpen, 
    onClose, 
    selectedID,
    updateTableData,
    urlComponentName,
    line_type
}) {

    // Функция отображение выбранного файла
        const [fileName, setFileName] = useState('Нет выбранных файлов');
        const [file, setFile] = useState();
      
        const handleFileChange = (event) => {
          const file = event.target.files[0];
          if (file) {
            setFileName(file.name);
            setFile(file)
          } else {
            setFileName('Нет выбранных файлов');
            setFile('');
          }
        };

    // Функция добавления нового файла
        const [updateTrigger, setUpdateTrigger] = useState(false);
        const handleAddNewFile = () => {
            setUpdateTrigger(true);
        };

        useEffect(() => {
            if (file) {
                const uploadData = new FormData();
                uploadData.append('name', fileName);
                uploadData.append('file', file, file.name);
                uploadData.append('line_number', selectedID);
                uploadData.append('line_type', line_type);
                uploadData.append('process_step', urlComponentName);
                

                fetch(`${API_Url}/api/${urlComponentName}/`, {
                    method: 'POST',
                    body: uploadData
                })
                .then( res => {
                    console.log(res); 
                    handleClose(); 
                    updateTableData()
                })
                .catch(error => console.log(error))     
            } else {

            }
        }, [updateTrigger]);
        
        // Функция закрытия модального окна
        const handleClose = () => {
            setFileName('Нет выбранных файлов')
            setFile('');
            onClose();
            setUpdateTrigger(false);
        };


  return (
    <>
    {isOpen && (
        <MainModalView onClick={() => handleClose()} myStyle={{ width: '700px', height: '400px' }}>
           
            <MainModalTopBlock>
                <MainModalText title={`Добавление нового файла`}/>
                <MainModalBtnBlock>
                    <SubmitButton onClick={(event) => handleAddNewFile(event)}></SubmitButton>
                    <ResetIconButton onClick={handleClose}></ResetIconButton>
                </MainModalBtnBlock>
            </MainModalTopBlock>

            <MainModalMainBlock>

                <div className="upload-modal-form__upload-block">
                    <div className="file-upload-animation-part">
                        <input 
                            className="file-upload-animation-part__input"
                            id="js-file-input"
                            type="file"
                            onChange={handleFileChange}
                        />

                        <div className="file-upload-animation-part__content">
                            <div className="file-upload-animation-part__infos">
                                <p className="file-upload-animation-part__icon">
                                    <svg />
                                    <span className="file-upload-animation-part__icon-shadow"></span>
                                    <span className="file-upload-animation-part__text">Кликните для выбора файла <br /> или <br /> перенесите его сюда</span>
                                </p>
                            </div>
                            <p className="file-upload-animation-part__name" id="js-file-name">{fileName}</p>
                        </div>
                    </div>
                </div>
                
            </MainModalMainBlock>
        </MainModalView>
    )}
    </>
  );
}

export default FileAdd;
