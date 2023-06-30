import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import UploadForm from './ImageUpload';
import { API_Url } from '../../../../App.js';
import SubmitButton from '../../../UI/Button/SubmitButton';
import RepeatIconButton from '../../../UI/Button/RepeatIconButton';
import DotsListGreyMiniButton from '../../../UI/Button/DotsListGreyMiniButton';
import ResetIconButton from '../../../UI/Button/ResetIconButton';
import BlockInput from '../../../UI/Input/BlockInput';
import BlockTextarea from '../../../UI/Textarea/BlockTextarea';
import BlockSelect from '../../../UI/Select/BlockSelect';
import DiscriptionList from '../../../Blocks/DiscriptionList';
import TotalBlockCheckBox from '../../../Blocks/TotalBlockCheckBox';
import { fetchBankEmployeesAPI, fetchCardsСategoriesAPI, fetchChipColorAPI, fetchChipNamesAPI, fetchEffectsAPI, fetchFilesAPI, fetchMagstripeColorsAPI, fetchMaterialtColorsAPI, fetchMaterialtTypesAPI } from '../../../API/GetLinesData';
import BlockCheckBox from '../../../UI/CheckBox/BlockCheckBox';
import SpoilerArrowBlock from '../../../Blocks/SpoilerArrowBlock';
import MainInfoBlock from '../../../Blocks/MainInfoBlock';
import BtnBlock from '../../../Blocks/BtnBlock';
import InfoBlock from '../../../Blocks/InfoBlock';
import FullInfoBlock from '../../../Blocks/FullInfoBlock';


function GeneralInfo({
    lineData,
    selectedID,
    currentLineUrl,
    updateAllLineData,
    line_type
}) {

    // Отслеживать открытие форм с информацией
        const [activeSpoiler, setActiveSpoiler] = useState(null);
        const handleSpoilerClick = (event) => {
            const clickedSpoiler = event.currentTarget;
            const spoilerBlock = clickedSpoiler.nextElementSibling;

            clickedSpoiler.classList.toggle('active');
            spoilerBlock.style.display = spoilerBlock.style.display === 'none' || !spoilerBlock.style.display ? 'block' : 'none';
            setActiveSpoiler(clickedSpoiler);
        };

    // Получение данных для списков
        useEffect(() => {
            fetchChipColor();
            fetchMaterialtTypes();
            fetchMaterialtColors();
            fetchMagstripeColors();
            fetchEffects();
        },[])

    // Получение списка с сотрудниками Банка
        const [bankEmployees, setBankEmployees] = useState([]);   
        useEffect(() => {
            async function fetchBankEmployees() {
                const list = await fetchBankEmployeesAPI.getAll(lineData.bank.id);   
                setBankEmployees(list);
            }
            fetchBankEmployees()
        },[lineData]);

    // Получение категорий карт
        const [cardСategories, setCardСategories] = useState([])
        useEffect(() => {
            async function fetchCardsСategories() {
                const list = await fetchCardsСategoriesAPI.getAll(lineData.payment_system.id);           
                setCardСategories(list);
            }
            fetchCardsСategories()
        },[lineData]);

    // получение названий чипов
        const [chipNames, setChipNames] = useState([]);
        useEffect(() => {
            async function fetchChipNames() {
                const list = await fetchChipNamesAPI.getAll(lineData.payment_system.id);           
                setChipNames(list);
                setSelectedChipId('')
            } 
            fetchChipNames()
        },[lineData]);

    // получение полного наименования чипов
        const [selectedChipId, setSelectedChipId] = useState('')
        const [fullChipName, setFullChipName] = useState('')
        useEffect(() => {
            const selectedChip = chipNames.find(item => item.id === selectedChipId);
            if (selectedChip) {
                setFullChipName(selectedChip.full_name);
            } else {
                setFullChipName('');
            }
        },[selectedChipId])
 
    // получение цветов чипов
        const [chipColors, setChipColors] = useState([])
        async function fetchChipColor() {
            const list = await fetchChipColorAPI.getAll();
            setChipColors(list);
        }   

    // получение типов материалов
        const [materialtTypes, setMaterialtTypes] = useState([])
        async function fetchMaterialtTypes() {
            const list = await fetchMaterialtTypesAPI.getAll();
            setMaterialtTypes(list);
        }  

    // получение цвета материалов
        const [materialtColors, setMaterialtColors] = useState([])
        async function fetchMaterialtColors() {
            const list = await fetchMaterialtColorsAPI.getAll();           
            setMaterialtColors(list);
        }  

    // получение цвета полосы для подписи
        const [magstripeColors, setMagstripeColors] = useState([])
        async function fetchMagstripeColors() {
            const list = await fetchMagstripeColorsAPI.getAll();           
            setMagstripeColors(list);
        }  

    //получение списка эффектов      
        const [effects, setEffects] = useState([])
        async function fetchEffects() {

            // преобразование эффектов из модели в список чисел
            const myEffects = lineData.card_effects ? lineData.card_effects.split(",").map(item => parseInt(item)) : []

            const list = await fetchEffectsAPI.getAll();
            if (list) {
                const withDefaultValue = list.map(item => {
                    return { ...item, defaultValue: myEffects.includes(item.id) ? true : false };
                });
                setEffects(withDefaultValue); 
            if (myEffects) {
                {myEffects.map(item => {setEffectsCheckboxes([...effectsCheckboxes, item])})}
            }
            } 
        }  
   
    // Создание списка из чекбоксов
        const [effectsCheckboxes, setEffectsCheckboxes] = useState([]);   
        const handleEffectsCheckboxChange = (event) => {
            const value = parseInt(event.target.value, 10);
            const isChecked = event.target.checked;

            if (isChecked) {
            // Добавляет номер чекбокса в список
            setEffectsCheckboxes([...effectsCheckboxes, value]);
            } else {
            // Удаляет номер чекбокса из списка
            const filteredList = effectsCheckboxes.filter((item) => item !== value);
            setEffectsCheckboxes(filteredList);
            //   
            } 
        };

        useEffect(() => {
                setLineFields({...lineFields, cards_effects: effectsCheckboxes})
        },[effectsCheckboxes])


    // Получение контактных данных по сотруднику Банка
        const [bank_employee_name, setBankEmployeeName] = useState('') 
        const [bank_employee_email, setBankEmployeeMail] = useState('')
        const [bank_employee_phone, setBankEmployeePhone] = useState('')
        const [bank_employee_other, setBankEmployeeOther] = useState('')

        const [selectedBankEmployeeId, setSelectedBankEmployeeId] = useState('')
        useEffect(() => {
                const selectedBankEmployee = bankEmployees.find(item => item.id === selectedBankEmployeeId);  
            
            if (selectedBankEmployee) {
                setBankEmployeeMail(selectedBankEmployee.email);
                setBankEmployeePhone(selectedBankEmployee.phone);
                setBankEmployeeOther(selectedBankEmployee.other);
            } else if (lineData.bank_employee) {
                setBankEmployeeName(lineData.bank_employee.id);
                setBankEmployeeMail(lineData.bank_employee.email);
                setBankEmployeePhone(lineData.bank_employee.phone);
                setBankEmployeeOther(lineData.bank_employee.other);               
            } else {
                setBankEmployeeMail('');
                setBankEmployeePhone('');
                setBankEmployeeOther(''); 
            }
        }, [selectedBankEmployeeId])

    // Коллбек из компонента загрузки превью
        const [newPreview, setNewPreview] = useState('')
        const addNewPreview = (file) => {
            setNewPreview(file)
        }
        
    // Создание списка с изменненными данными
        const [lineFields, setLineFields] = useState({})

        useEffect(() => {
            fieldsEmpty()
        },[])        
        function fieldsEmpty() {
            setLineFields({
                bank_employee: lineData.bank_employee ? lineData.bank_employee.id : '',
                bank_communication: lineData.bank_communication,
                vendor_communication: lineData.vendor_communication,
                general_comment: lineData.general_comment,
                card_qty: lineData.card_qty,
                payment_system: lineData.payment_system,
                card_category: lineData.card_category ? lineData.card_category.id : '',
                card_name: lineData.card_name,
                card_code: lineData.card_code,
                card_revision: lineData.card_revision,
                preview_image: lineData.preview_image,
                chip: lineData.chip ? lineData.chip.id : '',
                chip_color: lineData.chip_color ? lineData.chip_color.id : '',
                material_type: lineData.material_type ? lineData.material_type.id : '',
                material_color: lineData.material_color ? lineData.material_color.id : '',
                magstripe_color: lineData.magstripe_color ? lineData.magstripe_color.id : '',
                cards_effects: lineData.card_effects,
            }) 
        } 


    
    // Подготовка нового изображения для отправки на сервер
        const previewSave = async () => {
            if (newPreview) {
                const updatePreview = new FormData(); 
                updatePreview.append('preview_image', newPreview);
                try {
                    const { data } = await axios.put(`${currentLineUrl}${selectedID}/`, updatePreview);
                } catch (error) {
                console.error('Error:', error);
                }
            };    
        };

    // Подготовка данных по всем полям для отправки на сервер
        const dataLineSave = async () => {
            const effectsString = lineFields.cards_effects.join(',');
        
            const updateLineData = {
                bank_employee: lineFields.bank_employee,
                card_category: lineFields.card_category,
                chip: lineFields.chip,
                chip_color: lineFields.chip_color,
                material_type: lineFields.material_type,
                material_color: lineFields.material_color,
                magstripe_color: lineFields.magstripe_color,
                card_name: lineFields.card_name,
                card_code: lineFields.card_code,
                card_revision: lineFields.card_revision,
                card_qty: lineFields.card_qty,
                card_effects: effectsString,
                bank_communication: lineFields.bank_communication,
                vendor_communication: lineFields.vendor_communication,
                general_comment: lineFields.general_comment,
                // "created_by_name": "Alexander",
                // "modified_by_name": "Another person",
                // "modified_date": "",
            };
            try {
                const { data } = await axios.put(`${currentLineUrl}${selectedID}/`, updateLineData);
                updateAllLineData();
            } catch (error) {};
        }

    // Функция сохранения/обновления данных на сервере
        const handleDataLineSave = async () => {
            previewSave();
            dataLineSave();
        };

    // Функция обновления данных в ячейках    
        const handleDataLineUpdate = () => {
            updateAllLineData()
        }

    return (
        <MainInfoBlock>

            {/* -------- Кнопки -------- */}
            <BtnBlock>
                <SubmitButton onClick={handleDataLineSave}></SubmitButton>
                <RepeatIconButton onClick={handleDataLineUpdate}></RepeatIconButton>
                <DotsListGreyMiniButton></DotsListGreyMiniButton>
                {/* <ResetIconButton></ResetIconButton> */}
            </BtnBlock>

            {/* -------- Рисунок, комментарий -------- */}
            <InfoBlock>
                <UploadForm 
                    previewImage={lineData.preview_image}
                    addNewPreview={addNewPreview}
                />
                <DiscriptionList line={'not-line'} myStyle={{maxWidth: '25%'}}>

                        <BlockInput title={'Создал'}
                            myStyle={{ marginTop: '5px' }}
                            type='text'
                            value={lineData.created_by_name}
                            readOnly
                        >    
                        </BlockInput>

                        <BlockInput title={'Изменил'}
                            myStyle={{ marginTop: '5px' }}
                            type='text'
                            value={lineData.modified_by_name}
                            readOnly
                        >    
                        </BlockInput>
                </DiscriptionList>

                <DiscriptionList line={'not-line'} myStyle={{maxWidth: '20%'}}>

                    <BlockInput title={'Дата создания'}
                        myStyle={{ marginTop: '5px', marginLeft: '10px'}}
                        // type='date'
                        value={moment(lineData.created_date).format("DD.MM.YYYY")}
                        readOnly
                    >    
                    </BlockInput>

                    <BlockInput title={'Дата изменения'}
                        myStyle={{ marginTop: '5px', marginLeft: '10px'}}
                        // type='date'
                        value={lineData.modified_date ? moment(lineData.modified_date).format("DD.MM.YYYY") : ''}
                        readOnly
                    >    
                    </BlockInput>

                </DiscriptionList>
            
                <DiscriptionList line={'not-line'}>

                    <BlockTextarea title={'Комментарий'}
                            myStyle={{ marginTop: '5px' }}
                            myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                            type='text'
                            rows="8"
                            value={lineFields.general_comment}
                            onChange={(e) => setLineFields({...lineFields, general_comment: e.target.value})}
                    >    
                    </BlockTextarea>

                </DiscriptionList>
            </InfoBlock>

            {/* -------- Общая информация по заказу -------- */}
            <FullInfoBlock>

                    {/* -------- Общие данные по Банку -------- */}
                    <SpoilerArrowBlock title={'Общие данные'} onClick={handleSpoilerClick}>

                        <DiscriptionList title={'Реквизиты Банка (eng):'}>
                                <BlockInput title={'Банк (eng)'}
                                    myStyle={{ marginTop: '15px' }}
                                    type='text'
                                    value={lineData.bank.name_eng}
                                    readOnly
                                >    
                                </BlockInput>

                                <BlockInput title={'Полное наименование (eng)'}
                                    myStyle={{ marginTop: '15px' }}
                                    type='text'
                                    value={lineData.bank.full_name_eng}
                                    readOnly
                                >    
                                </BlockInput>

                                <BlockTextarea title={'Адрес (eng)'}
                                    myStyle={{ marginTop: '15px' }}
                                    myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                    type='text'
                                    rows="4"
                                    value={lineData.bank.address_eng}
                                    readOnly
                                >    
                                </BlockTextarea>

                                <BlockInput title={'Страна (eng)'}
                                    myStyle={{ marginTop: '15px' }}
                                    type='text'
                                    value={lineData.bank.country.name_eng}
                                    readOnly
                                >    
                                </BlockInput>

                        </DiscriptionList>
                                                                                
                        <DiscriptionList  title={'Реквизиты Банка (rus):'}>
                            <BlockInput title={'Банк (ru)'}
                                myStyle={{ marginTop: '15px' }}
                                type='text'
                                value={lineData.bank.name_rus}
                                readOnly
                            >    
                            </BlockInput>
                            
                            <BlockInput title={'Полное наименование (рус)'}
                                myStyle={{ marginTop: '15px' }}
                                type='text'
                                value={lineData.bank.full_name_rus}
                                readOnly
                            >    
                            </BlockInput>

                            <BlockTextarea title={'Адрес (рус)'}
                                myStyle={{ marginTop: '15px' }}
                                myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                type='text'
                                rows="4"
                                value={lineData.bank.address_rus}
                                readOnly
                            >    
                            </BlockTextarea>

                            <BlockInput title={'Страна (рус)'}
                                myStyle={{ marginTop: '15px' }}
                                type='text'
                                value={lineData.bank.country.name_rus}
                                readOnly
                            >    
                            </BlockInput>
                        
                        </DiscriptionList>    

                        <DiscriptionList  title={'Контакты Банка:'}>

                            <BlockSelect title={'Имя сотрудника'} 
                                myStyle={{ marginTop: '15px' }}
                                value={lineFields.bank_employee}
                                onChange={(e) => {
                                    setSelectedBankEmployeeId(parseInt(e, 10));
                                    setLineFields({...lineFields, bank_employee: e})
                                }}
                                defaultValue={bank_employee_name}
                                options={bankEmployees}
                            >
                            </BlockSelect>
                            
                            <BlockInput title={'Почта сотрудника'}
                                    myStyle={{ marginTop: '15px' }}
                                    type='text'
                                    value={bank_employee_email}
                                    readOnly
                                >    
                            </BlockInput>

                            <BlockInput title={'Телефон сотрудника'}
                                    myStyle={{ marginTop: '15px' }}
                                    type='text'
                                    value={bank_employee_phone}
                                    readOnly
                                >    
                            </BlockInput>

                            <BlockTextarea title={'Дополнительная информация'}
                                    myStyle={{ marginTop: '15px' }}
                                    myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                    type='text'
                                    rows="4"
                                    value={bank_employee_other}
                                    readOnly
                                >    
                            </BlockTextarea>    

                        </DiscriptionList>     

                        <DiscriptionList  title={'Общение по заказу:'} line={'not-line'}>

                            <BlockTextarea title={'Тема письма с Банком'}
                                    myStyle={{ marginTop: '15px' }}
                                    myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                    type='text'
                                    rows="5"
                                    value={lineFields.bank_communication}
                                    onChange={(e) => setLineFields({...lineFields, bank_communication: e.target.value})}
                            >    
                            </BlockTextarea>

                            <BlockTextarea title={'Тема письма с Вендором'}
                                    myStyle={{ marginTop: '15px' }}
                                    myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                    type='text'
                                    rows="5"
                                    value={lineFields.vendor_communication}
                                    onChange={(e) => setLineFields({...lineFields, vendor_communication: e.target.value})}
                            >    
                            </BlockTextarea>

                        </DiscriptionList>

                    </SpoilerArrowBlock>

                    {/* -------- Общие данные по заказу -------- */}
                    <SpoilerArrowBlock title={'Данные по заказу'} onClick={handleSpoilerClick}>
                        <DiscriptionList title={'Количество карт:'}>

                            <BlockInput title={'Количество карт в заказе'}
                                myStyle={{ marginTop: '15px' }}
                                type='number'
                                min={0}
                                value={lineFields.card_qty}
                                onChange={(e) => setLineFields({...lineFields, card_qty: e.target.value})}
                            >    
                            </BlockInput>

                            <BlockInput title={'Фактическое количество'}
                                myStyle={{ marginTop: '15px' }}
                                type='number'
                                min={0}
                                value={lineData.card_qty_fact}
                                readOnly
                            >    
                            </BlockInput>

                        </DiscriptionList>

                        <DiscriptionList title={'Описание карты:'}>

                            <BlockInput title={'Платежная система'}
                                myStyle={{ marginTop: '15px' }}
                                type='text'
                                value={lineData.payment_system.name}
                                readOnly
                            >    
                            </BlockInput>

                            <BlockSelect title={'Категория карты'}
                                myStyle={{ marginTop: '15px' }}
                                value={lineFields.card_category}
                                onChange={e => setLineFields({...lineFields, card_category: e})}
                                options={cardСategories}
                                defaultValue={lineData.card_category.id}
                            >
                            </BlockSelect>
                            
                            <BlockInput title={'Название карты'}
                                myStyle={{ marginTop: '15px' }}
                                type='text'
                                value={lineFields.card_name}
                                onChange={(e) => setLineFields({...lineFields, card_name: e.target.value})}
                            >    
                            </BlockInput>

                            <BlockInput title={'Код карты'}
                                myStyle={{ marginTop: '15px' }}
                                type='text'
                                value={lineFields.card_code}
                                onChange={(e) => setLineFields({...lineFields, card_code: e.target.value})}                                                
                            >    
                            </BlockInput>

                            <BlockInput title={'Ревизия'}
                                myStyle={{ marginTop: '15px' }}
                                type='text'
                                value={lineFields.card_revision}
                                onChange={(e) => setLineFields({...lineFields, card_revision: e.target.value})}
                            >    
                            </BlockInput>                                            
                        </DiscriptionList>

                        <DiscriptionList title={'Описание чипа:'}>

                            <BlockSelect title={'Название чипа'}
                                myStyle={{ marginTop: '15px' }}
                                value={lineFields.chip}
                                onChange={(e) => {
                                    setLineFields({...lineFields, chip: e});
                                    setSelectedChipId(parseInt(e, 10));
                                }}
                                defaultValue={lineData.chip.id}
                                options={chipNames}
                            >
                            </BlockSelect>

                            <BlockInput title={'Полное название чипа'}
                                myStyle={{ marginTop: '15px' }}
                                type='text'
                                value={fullChipName}
                                readOnly
                            >    
                            </BlockInput>

                            <BlockSelect title={'Цвет контактной площадки'}
                                myStyle={{ marginTop: '15px' }}
                                value={lineFields.chip_color}
                                onChange={e => setLineFields({...lineFields, chip_color: e})}
                                defaultValue={lineData.chip_color.id}
                                options={chipColors}
                            >
                            </BlockSelect>                                         

                        </DiscriptionList>
                            
                        <DiscriptionList title={'Описание эффектов:'} line={'not-line'}>

                            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                                <BlockSelect title={'Материал (тип)'}
                                    myStyle={{ marginTop: '15px' }}
                                    value={lineFields.material_type}
                                    onChange={e => setLineFields({...lineFields, material_type: e})}
                                    defaultValue={lineData.material_type.id}
                                    options={materialtTypes}
                                >
                                </BlockSelect>

                                <BlockSelect title={'Материал (цвет)'}
                                    myStyle={{ marginTop: '15px', marginLeft: '5px' }}
                                    value={lineFields.material_color}
                                    onChange={e => setLineFields({...lineFields, material_color: e})}
                                    defaultValue={lineData.material_color.id}
                                    options={materialtColors}
                                >
                                </BlockSelect>

                            </div>

                            <BlockSelect title={'Магнитная полоса (цвет)'}
                                myStyle={{ marginTop: '15px' }}
                                value={lineFields.magstripe_color}
                                onChange={e => setLineFields({...lineFields, magstripe_color: e})}
                                defaultValue={lineData.magstripe_color.id}
                                options={magstripeColors}
                            >
                            </BlockSelect>

                            <DiscriptionList myStyle={{ padding: '0', marginTop: '7px' }} line={'not-line'}>
                                <TotalBlockCheckBox title={'Эффекты'} myStyle={{ minHeight: "150px", maxHeight: "200px" }}>
                                    {effects.map((item) => (
                                        <BlockCheckBox
                                            value={item.id}
                                            onChange={(e) => handleEffectsCheckboxChange(e)}
                                            defaultValue={item.defaultValue}
                                            title={item.value}
                                        >
                                        </BlockCheckBox>
                                    ))}
                                </TotalBlockCheckBox>
                            </DiscriptionList>
                        </DiscriptionList>
                    </SpoilerArrowBlock>

                    {/* -------- Последние документы по заказу -------- */}
                    <SpoilerArrowBlock title={'Документы'} onClick={handleSpoilerClick}>
                                <div className="table-block">
                                    
                                </div>
                    </SpoilerArrowBlock>

            </FullInfoBlock>

        </MainInfoBlock>

    )
}

export default GeneralInfo