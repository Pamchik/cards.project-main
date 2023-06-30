import React, { useState, useEffect } from 'react';
import axios from 'axios';
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


function GeneralInfo({
    lineBottomInfo,
    lineData,
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

        const [bank_employee_name, setBankEmployeeName] = useState('')
        const [bank_employee_mail, setBankEmployeeMail] = useState('')
        const [bank_employee_phone, setBankEmployeePhone] = useState('')
        const [bank_employee_other, setBankEmployeeOther] = useState('')
    
    // Получение списка с сотрудниками Банка
        const [bankEmployees, setBankEmployees] = useState([]);
        useEffect(() => {
            axios({
                method: 'GET',
                url: `${API_Url}/api/bank-employees/`
            }).then(response => {
                setBankEmployees(response.data);
            });
        }, []);

    // Получение контактных данных по сотруднику Банка
        const handleBankEmployeeChange = (e) => {

            const selectedBankEmployeeId = parseInt(e.target.value, 10);
            const selectedBankEmployee = bankEmployees.find(item => item.id === selectedBankEmployeeId);

            if (selectedBankEmployee) {
                setBankEmployeeName(selectedBankEmployeeId);
                setBankEmployeeMail(selectedBankEmployee.email);
                setBankEmployeePhone(selectedBankEmployee.phone);
                setBankEmployeeOther(selectedBankEmployee.other);
            } else {
                setBankEmployeeName('');
                setBankEmployeeMail('');
                setBankEmployeePhone('');
                setBankEmployeeOther('');
            }
        };

    return (
        <div className="tabs-general__pane tabs-general__pane_show">
            <div className="general-card-info">
                <div className="general-card-info__main">

                    {/* -------- Кнопки -------- */}
                    <div className="general-card-info__btn">
                        <SubmitButton></SubmitButton>
                        <RepeatIconButton></RepeatIconButton>
                        <DotsListGreyMiniButton></DotsListGreyMiniButton>
                        <ResetIconButton></ResetIconButton>
                    </div>

                    {/* -------- Рисунок, комментарий -------- */}
                    <div className="general-card-info__info">
                        <UploadForm 
                            previewImage={lineBottomInfo.previewImage}
                        />
                        <div className="general-card-info__block-create-modify">
                            <div className="general-card-info__line-info">
                                <div className="text-field">
                                    <div className="text-field text-field_full-margin-5">
                                        <label for="creator-order-for-card"
                                            className="text-field__label">Создал
                                        </label>
                                        <input type="text" className="text-field__input"
                                            name="icreator-order-for-card"
                                            id="creator-order-for-card"
                                            value="Alexander.Eremin" readOnly />
                                    </div>
                                    <div className="text-field text-field_full-margin-5">
                                        <label for="moderator-order-for-card"
                                            className="text-field__label">Изменил
                                        </label>
                                        <input type="text" className="text-field__input"
                                            name="moderator-order-for-card"
                                            id="moderator-order-for-card"
                                            value="Alexander.Eremin" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="general-card-info__date">
                                <div
                                    className="text-field text-field_full-margin-5 text-field_w60-percent">
                                    <label for="creator-order-for-card"
                                        className="text-field__label">Дата создания
                                    </label>
                                    <input type="date" className="text-field__input"
                                        name="icreator-order-for-card"
                                        id="creator-order-for-card" 
                                        readOnly />
                                </div>
                                <div
                                    className="text-field text-field_full-margin-5 text-field_w60-percent">
                                    <label for="moderator-order-for-card"
                                        className="text-field__label">Дата изменения
                                    </label>
                                    <input type="date" className="text-field__input"
                                        name="moderator-order-for-card"
                                        id="moderator-order-for-card" 
                                        readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="general-card-info__comment">
                            <div className="text-field text-field_top-margin-5">
                                <label className="text-field__label"
                                    for="order-comment">Комментарий</label>
                                <textarea
                                    className="text-field__textarea text-field__textarea_resize-not"
                                    name="order-comment" id="order-comment"
                                    rows="4"></textarea>
                            </div>
                        </div>
                    </div>

                    {/* -------- Общая информация по заказу -------- */}
                    <div className="general-card-info__full-info">
                        <div className="spoiler-arrow">

                            {/* -------- Общие данные по Банку -------- */}
                            <div className="spoiler-arrow__item">
                                <div className="spoiler-arrow__title" onClick={handleSpoilerClick}>Общие данные</div>
                                <div className="spoiler-arrow__block">
                                    <div className="spoiler-arrow__block-content">
                                        <DiscriptionList title={'Реквизиты Банка (eng):'}>
                                                <BlockInput
                                                    myStyle={{ marginTop: '15px' }}
                                                    title={'Банк (eng)'}
                                                    type='text'
                                                    value={lineBottomInfo.bankName.name_eng}
                                                    readOnly
                                                >    
                                                </BlockInput>

                                                <BlockInput
                                                    myStyle={{ marginTop: '15px' }}
                                                    title={'Полное наименование (eng)'}
                                                    type='text'
                                                    value={lineBottomInfo.bankName.full_name_eng}
                                                    readOnly
                                                >    
                                                </BlockInput>

                                                <BlockTextarea
                                                    myStyle={{ marginTop: '15px' }}
                                                    myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                                    title={'Адрес (eng)'}
                                                    type='text'
                                                    rows="4"
                                                    value={lineBottomInfo.bankName.address_eng}
                                                    readOnly
                                                >    
                                                </BlockTextarea>

                                                <BlockInput
                                                    myStyle={{ marginTop: '15px' }}
                                                    title={'Страна (eng)'}
                                                    type='text'
                                                    value={lineBottomInfo.bankCountry.name_eng}
                                                    readOnly
                                                >    
                                                </BlockInput>

                                        </DiscriptionList>
                                                                                                
                                        <DiscriptionList  title={'Реквизиты Банка (rus):'}>
                                            <BlockInput
                                                myStyle={{ marginTop: '15px' }}
                                                title={'Банк (ru)'}
                                                type='text'
                                                value={lineBottomInfo.bankName.name_rus}
                                                readOnly
                                            >    
                                            </BlockInput>
                                            
                                            <BlockInput
                                                myStyle={{ marginTop: '15px' }}
                                                title={'Полное наименование (рус)'}
                                                type='text'
                                                value={lineBottomInfo.bankName.full_name_rus}
                                                readOnly
                                            >    
                                            </BlockInput>

                                            <BlockTextarea
                                                myStyle={{ marginTop: '15px' }}
                                                myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                                title={'Адрес (рус)'}
                                                type='text'
                                                rows="4"
                                                value={lineBottomInfo.bankName.address_rus}
                                                readOnly
                                            >    
                                            </BlockTextarea>

                                            <BlockInput
                                                myStyle={{ marginTop: '15px' }}
                                                title={'Страна (рус)'}
                                                type='text'
                                                value={lineBottomInfo.bankCountry.name_rus}
                                                readOnly
                                            >    
                                            </BlockInput>
                                        
                                        </DiscriptionList>    

                                        <DiscriptionList  title={'Контакты Банка:'}>

                                            <BlockSelect 
                                                myStyle={{ marginTop: '15px' }}
                                                title={'Имя сотрудника'}
                                                value={bank_employee_name}
                                                // onChange={e => setLineFields({...lineFields, bank_name_eng: e})}
                                                onChange={(e) => {
                                                    setBankEmployeeName(e.target.value);
                                                    handleBankEmployeeChange(e);
                                                }}
                                                // defaultValue={bankNames[1].id}
                                                defaultValue={''}
                                                options={bankEmployees}
                                            >
                                            </BlockSelect>
                                            
                                            <BlockInput
                                                    myStyle={{ marginTop: '15px' }}
                                                    title={'Телефон сотрудника'}
                                                    type='text'
                                                    value={bank_employee_mail}
                                                    readOnly
                                                >    
                                            </BlockInput>

                                            <BlockInput
                                                    myStyle={{ marginTop: '15px' }}
                                                    title={'Почта сотрудника'}
                                                    type='text'
                                                    value={bank_employee_phone}
                                                    readOnly
                                                >    
                                            </BlockInput>

                                            <BlockTextarea
                                                    myStyle={{ marginTop: '15px' }}
                                                    myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                                    title={'Дополнительная информация'}
                                                    type='text'
                                                    rows="4"
                                                    value={bank_employee_other}
                                                    readOnly
                                                >    
                                            </BlockTextarea>    

                                        </DiscriptionList>     

                                        <DiscriptionList  title={'Общение по заказу:'}>

                                            <BlockTextarea
                                                    myStyle={{ marginTop: '15px' }}
                                                    myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                                    title={'Тема письма с Банком'}
                                                    type='text'
                                                    rows="5"
                                                    value={''}
                                                    // onChange={(e) => setLineFields({...lineFields, card_name: e.target.value})}
                                                    readOnly
                                            >    
                                            </BlockTextarea>

                                            <BlockTextarea
                                                    myStyle={{ marginTop: '15px' }}
                                                    myStyleTextarea={{resize: 'none', height: '100%', width: '100%'}}
                                                    title={'Тема письма с Вендором'}
                                                    type='text'
                                                    rows="5"
                                                    value={''}
                                                    // onChange={(e) => setLineFields({...lineFields, card_name: e.target.value})}
                                                    readOnly
                                            >    
                                            </BlockTextarea>

                                        </DiscriptionList>
                                        
                                    </div>
                                </div>
                            </div>

                            {/* -------- Общие данные по заказу -------- */}
                            <div className="spoiler-arrow__item">
                                <div className="spoiler-arrow__title" onClick={handleSpoilerClick}>Данные по заказу</div>
                                <div className="spoiler-arrow__block">
                                    <div className="spoiler-arrow__block-content">
                                        <DiscriptionList title={'Количество карт:'}>

                                            <BlockInput
                                                myStyle={{ marginTop: '15px' }}
                                                title={'Количество карт в заказе'}
                                                type='number'
                                                min={0}
                                                // value={bank_employee_phone}
                                            >    
                                            </BlockInput>

                                            <BlockInput
                                                myStyle={{ marginTop: '15px' }}
                                                title={'Фактическое количество'}
                                                type='number'
                                                min={0}
                                                // value={bank_employee_phone}
                                                readOnly
                                            >    
                                            </BlockInput>

                                        </DiscriptionList>

                                        <DiscriptionList title={'Описание карты:'}>

                                            <BlockInput
                                                myStyle={{ marginTop: '15px' }}
                                                title={'Платежная система'}
                                                type='text'
                                                // value={bank_employee_phone}
                                                readOnly
                                            >    
                                            </BlockInput>

                                            {/* <BlockSelect 
                                                myStyle={{ marginTop: '15px' }}
                                                title={'Категория карты'}
                                                // value={lineFields.bank_name_eng}
                                                // onChange={e => setLineFields({...lineFields, bank_name_eng: e})}
                                                // onChange={(e) => {
                                                //     setBankEmployeeName(e.target.value);
                                                //     handleBankEmployeeChange(e);
                                                // }}
                                                // defaultValue={bankNames[1].id}
                                                defaultValue={''}
                                                // options={bankEmployees}
                                            >
                                            </BlockSelect> */}

                                            <BlockInput title={'Платежная система'}
                                                myStyle={{ marginTop: '15px' }}
                                                type='text'
                                                // value={bank_employee_phone}
                                                readOnly
                                            >    
                                            </BlockInput>

                                            <BlockInput title={'Название карты'}
                                                myStyle={{ marginTop: '15px' }}
                                                type='text'
                                                // value={bank_employee_phone}
                                                readOnly
                                            >    
                                            </BlockInput>

                                            <BlockInput title={'Код карты'}
                                                myStyle={{ marginTop: '15px' }}
                                                type='text'
                                                // value={bank_employee_phone}
                                                readOnly
                                            >    
                                            </BlockInput>

                                            <BlockInput title={'Ревизия'}
                                                myStyle={{ marginTop: '15px' }}
                                                type='text'
                                                // value={bank_employee_phone}
                                                readOnly
                                            >    
                                            </BlockInput>                                            
                                        </DiscriptionList>

                                        <DiscriptionList title={'Описание чипа:'}>
    
                                            {/* <BlockSelect title={'Название чипа'}
                                                myStyle={{ marginTop: '15px' }}
                                                // value={lineFields.bank_name_eng}
                                                // onChange={e => setLineFields({...lineFields, bank_name_eng: e})}
                                                // onChange={(e) => {
                                                //     setBankEmployeeName(e.target.value);
                                                //     handleBankEmployeeChange(e);
                                                // }}
                                                // defaultValue={bankNames[1].id}
                                                defaultValue={''}
                                                // options={bankEmployees}
                                            >
                                            </BlockSelect> */}

                                            <BlockInput title={'Полное название чипа'}
                                                myStyle={{ marginTop: '15px' }}
                                                type='text'
                                                // value={bank_employee_phone}
                                                readOnly
                                            >    
                                            </BlockInput>
                                            
                                            {/* <BlockSelect title={'Цвет контактной площадки'}
                                                myStyle={{ marginTop: '15px' }}
                                                // value={lineFields.bank_name_eng}
                                                // onChange={e => setLineFields({...lineFields, bank_name_eng: e})}
                                                // onChange={(e) => {
                                                //     setBankEmployeeName(e.target.value);
                                                //     handleBankEmployeeChange(e);
                                                // }}
                                                // defaultValue={bankNames[1].id}
                                                defaultValue={''}
                                                // options={bankEmployees}
                                            >
                                            </BlockSelect> */}

                                        </DiscriptionList>
                                            
                                        <DiscriptionList title={'Описание эффектов:'}>

                                            <div className="card-effects__plastic-block">

                                                {/* <BlockSelect title={'Материал (тип)'}
                                                    myStyle={{ marginTop: '15px' }}
                                                    // value={lineFields.bank_name_eng}
                                                    // onChange={e => setLineFields({...lineFields, bank_name_eng: e})}
                                                    // onChange={(e) => {
                                                    //     setBankEmployeeName(e.target.value);
                                                    //     handleBankEmployeeChange(e);
                                                    // }}
                                                    // defaultValue={bankNames[1].id}
                                                    defaultValue={''}
                                                    // options={bankEmployees}
                                                >
                                                </BlockSelect> */}

                                                {/* <BlockSelect title={'Материал (цвет)'}
                                                    myStyle={{ marginTop: '15px' }}
                                                    // value={lineFields.bank_name_eng}
                                                    // onChange={e => setLineFields({...lineFields, bank_name_eng: e})}
                                                    // onChange={(e) => {
                                                    //     setBankEmployeeName(e.target.value);
                                                    //     handleBankEmployeeChange(e);
                                                    // }}
                                                    // defaultValue={bankNames[1].id}
                                                    defaultValue={''}
                                                    // options={bankEmployees}
                                                >
                                                </BlockSelect> */}

                                            </div>

                                            {/* <BlockSelect title={'Магнитная полоса (цвет)'}
                                                    myStyle={{ marginTop: '15px' }}
                                                    // value={lineFields.bank_name_eng}
                                                    // onChange={e => setLineFields({...lineFields, bank_name_eng: e})}
                                                    // onChange={(e) => {
                                                    //     setBankEmployeeName(e.target.value);
                                                    //     handleBankEmployeeChange(e);
                                                    // }}
                                                    // defaultValue={bankNames[1].id}
                                                    defaultValue={''}
                                                    // options={bankEmployees}
                                                >
                                            </BlockSelect> */}

                                            <DiscriptionList>
                                                <TotalBlockCheckBox title={'Эффекты'}>
                                                    {/* {effects.map((item) => (
                                                        <BlockCheckBox
                                                            key={item.id}
                                                            value={item.id}
                                                            onChange={handleEffectsCheckboxChange}
                                                            checked={effectsCheckboxes[item.id] === 1}
                                                            title={item.name}
                                                        >
                                                        </BlockCheckBox>
                                                    ))} */}
                                                </TotalBlockCheckBox>
                                            </DiscriptionList>
                                        </DiscriptionList>
                                    </div>
                                </div>
                            </div>

                            {/* -------- Последние документы по заказу -------- */}
                            <div className="spoiler-arrow__item" >
                                <div className="spoiler-arrow__title" onClick={handleSpoilerClick}>Документы</div>
                                <div
                                    className="spoiler-arrow__block spoiler-arrow__block_no-border">
                                    <div className="spoiler-arrow__block-content">
                                        <div className="table-block">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default GeneralInfo