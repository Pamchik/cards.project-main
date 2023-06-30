import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import { checkUrl, API_Url } from '../../App.js';
import SubmitButton from '../UI/Button/SubmitButton';
import ResetIconButton from '../UI/Button/ResetIconButton.jsx';
import DotsListGreyMiniButton from '../UI/Button/DotsListGreyMiniButton.jsx';
import DiscriptionList from '../Blocks/DiscriptionList.jsx';
import TotalBlockCheckBox from '../Blocks/TotalBlockCheckBox.jsx';
import { MainModalView, MainModalTopBlock, MainModalBtnBlock, MainModalText, MainModalMainBlock } from './MainModalView.jsx';
import BlockInput from '../UI/Input/BlockInput.jsx';
import BlockSelect from '../UI/Select/BlockSelect.jsx';
import BlockCheckBox from '../UI/CheckBox/BlockCheckBox.jsx';
import { fetchBankNamesAPI,fetchChipColorAPI,fetchChipNamesAPI,fetchEffectsAPI,fetchMagstripeColorsAPI,fetchMaterialtColorsAPI,fetchMaterialtTypesAPI,fetchPaymentSystemsAPI,fetchCardsСategoriesAPI } from '../API/GetLinesData.js';


function CreateNewLine({ isOpen, onClose }) {
     
    // Проверка текущего URL и настройка URL для будущей отправки данных
        const currentUrl = window.location.href;

        const [receiverUrl, setReceiverUrl] = useState('')
        const [windowName, setWindowName] = useState('')

        useEffect(() => {
            if (currentUrl === `${checkUrl}/projects/`) {
                setReceiverUrl(`${API_Url}/api/projects/`);
                setWindowName('проекта')
            } else if (currentUrl === `${checkUrl}/orders/`) {
                setReceiverUrl(`${API_Url}/api/orders/`);
                setWindowName('заказа')
            } 
        }, [currentUrl]);

    //  Функция обнуления данных в полях
        function fieldsEmpty() {
            setLineFields({
                bank_name_eng: '',
                payment_system: '',
                card_category: '',
                card_name: '',
                card_qty: '',
                chip: '', 
                chip_color: '',
                material_type: '',
                material_color: '',
                magstripe_color: '',
                cards_effects: '',
            })
        }
        
        
    //  Функция закрытия модального окна
        const handleClose = () => {
            if (window.confirm('Вы уверены, что хотите закрыть окно?')) {
                // setEffectsCheckboxes([]);  
                fieldsEmpty();
                onClose();
            }
        };

    // Получение данных для списков
        useEffect(() => {
            fetchBankNames();
            fetchPaymentSystems();
            fetchChipColor();
            fetchMaterialtTypes();
            fetchMaterialtColors();
            fetchMagstripeColors();
            fetchEffects();
        },[])
    
    // получение Названий банков
        const [bankNames, setBankNames] = useState([])       
        async function fetchBankNames() {
            const list = await fetchBankNamesAPI.getAll();
            setBankNames(list);
        }

    // получение Платежных систем
        const [paymentSystems, setPaymentSystems] = useState([])
        const [selectedPaymentSystemId, setSelectedPaymentSystemId] = useState('')
        async function fetchPaymentSystems() {
            const list = await fetchPaymentSystemsAPI.getAll();
            setPaymentSystems(list);
        }  

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

    // получение названий чипов
        const [chipNames, setChipNames] = useState([]);
        useEffect(() => {
            async function fetchChipNames() {
                const list = await fetchChipNamesAPI.getAll(selectedPaymentSystemId);           
                setChipNames(list);
                setSelectedChipId('')
            } 
            fetchChipNames()
        },[selectedPaymentSystemId]);

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

    // получение категорий карт
        const [cardСategories, setCardСategories] = useState([])
        useEffect(() => {
            async function fetchCardsСategories() {
                const list = await fetchCardsСategoriesAPI.getAll(selectedPaymentSystemId);           
                setCardСategories(list);
            }
            fetchCardsСategories()
        },[selectedPaymentSystemId]);

        
    //получение списка эффектов
        const [effects, setEffects] = useState([])
        async function fetchEffects() {
            const list = await fetchEffectsAPI.getAll();   
            if (list) {
                const withDefaultValue = list.map(item => {
                    return { ...item, defaultValue: false };
                });
                setEffects(withDefaultValue);               
            } 
        } 

    // Создание списка из чекбоксов
        const [lineFields, setLineFields] = useState({})  

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
 
    // Функция отправки данных на сервер
        const [newLine, setNewLine] = useState([]);
  
        const handleAddNewLine = async () => {
            const effectsString = lineFields.cards_effects.join(',');
            const createNewLine = async () => {
                const createNewLineData = {
                    bank: lineFields.bank_name_eng,
                    payment_system: lineFields.payment_system,
                    card_category: lineFields.card_category,
                    card_name: lineFields.card_name,
                    card_qty: lineFields.card_qty,
                    chip: lineFields.chip,
                    chip_color: lineFields.chip_color,
                    material_type: lineFields.material_type,
                    material_color: lineFields.material_color,
                    magstripe_color: lineFields.magstripe_color,
                    card_effects: effectsString
                };
                // console.log(effectsString)
                const { data } = await axios.post(`${receiverUrl}`, createNewLineData);
            };

            const newNewLine = await createNewLine();
            setNewLine([...newLine, newNewLine]);
            setLineFields([])
            fieldsEmpty() 
            onClose();
            window.location.reload();
        };

  return (
    <>
    {isOpen && (
        <MainModalView>
            <MainModalTopBlock>
                <MainModalText title={`Создание нового ${windowName}`}/>
                <MainModalBtnBlock>
                    <SubmitButton onClick={handleAddNewLine}></SubmitButton>
                    <DotsListGreyMiniButton></DotsListGreyMiniButton>
                    <ResetIconButton onClick={handleClose}></ResetIconButton>
                </MainModalBtnBlock>
            </MainModalTopBlock>
            <MainModalMainBlock>
                <DiscriptionList title={'Основная информация:'}>
                        
                    <BlockSelect title={'Название Банка'}
                        myStyle={{ marginTop: '15px' }}
                        value={lineFields.bank_name_eng}
                        onChange={e => setLineFields({...lineFields, bank_name_eng: e})}
                        defaultValue={''}
                        options={bankNames}
                    >
                    </BlockSelect>

                    <BlockSelect title={'Платежная система'}
                        myStyle={{ marginTop: '15px' }}
                        value={lineFields.payment_system}
                        onChange={e => {
                            setLineFields({...lineFields, payment_system: e});
                            setSelectedPaymentSystemId(parseInt(e, 10));

                        }}
                        defaultValue={''}
                        options={paymentSystems}
                    >
                    </BlockSelect>

                    <BlockSelect title={'Категория карты'}
                        myStyle={{ marginTop: '15px' }}
                        value={lineFields.card_category}
                        onChange={e => setLineFields({...lineFields, card_category: e})}
                        defaultValue={''}
                        options={cardСategories}
                    >
                    </BlockSelect>

                    <BlockInput title={'Название карты'}
                        myStyle={{ marginTop: '15px' }}
                        type='text'
                        value={lineFields.card_name}
                        placeholder="Введите название карты" 
                        onChange={(e) => setLineFields({...lineFields, card_name: e.target.value})}
                    >    
                    </BlockInput>

                    <BlockInput title={'Количество карт в заказе'}
                        myStyle={{ marginTop: '15px' }}
                        type='number'
                        value={lineFields.card_qty}
                        placeholder="Введите количество карт" 
                        onChange={(e) => setLineFields({...lineFields, card_qty: e.target.value})}
                        min={0}                        
                    >    
                    </BlockInput>

                </DiscriptionList>

                <DiscriptionList title={'Описание чипа:'}>

                    <BlockSelect title={'Название чипа'}
                        myStyle={{ marginTop: '15px' }}
                        value={lineFields.chip}
                        onChange={e => {
                            setLineFields({...lineFields, chip: e});
                            setSelectedChipId(parseInt(e, 10));
                        }}
                        defaultValue={''}
                        options={chipNames}
                        // disabled
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
                        defaultValue={''}
                        options={chipColors}
                    >
                    </BlockSelect>

                </DiscriptionList>

                <DiscriptionList title={'Основные эффекты:'}>

                    <BlockSelect title={'Материал (тип)'}
                        myStyle={{ marginTop: '15px' }}
                        value={lineFields.material_type}
                        onChange={e => setLineFields({...lineFields, material_type: e})}
                        defaultValue={''}
                        options={materialtTypes}
                    >
                    </BlockSelect>

                    <BlockSelect title={'Материал (цвет)'}
                        myStyle={{ marginTop: '15px' }}
                        value={lineFields.material_color}
                        onChange={e => setLineFields({...lineFields, material_color: e})}
                        defaultValue={''}
                        options={materialtColors}
                    >
                    </BlockSelect>

                    <BlockSelect title={'Магнитная полоса (цвет)'}
                        myStyle={{ marginTop: '15px' }}
                        value={lineFields.magstripe_color}
                        onChange={e => setLineFields({...lineFields, magstripe_color: e})}
                        defaultValue={''}
                        options={magstripeColors}
                    >
                    </BlockSelect>

                </DiscriptionList>

                <DiscriptionList title={'Дополнительные эффекты:'} line={'not-line'} myStyle={{ marginBottom: '10px' }}>

                    <TotalBlockCheckBox title={'Эффекты'}>
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
            </MainModalMainBlock>
        </MainModalView>
    )}
    </>
  );
}

export default CreateNewLine;
