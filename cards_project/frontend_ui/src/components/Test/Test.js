import React, { useEffect, useState } from "react";
import DiscriptionList from "../Blocks/DiscriptionList";
import TotalBlockCheckBox from "../Blocks/TotalBlockCheckBox";
import BlockCheckBoxTest from "../UI/CheckBox/BlockCheckBox";
import BlockCheckBox from "../UI/CheckBox/BlockCheckBox";
import { fetchEffectsAPI } from "../API/GetLinesData";
// import './App.css';

function Test() {
 // useEffect(() => {
        //     Promise.all([
        //         axios.get(`${API_Url}/api/banks/`),
        //         axios.get(`${API_Url}/api/payment-systems/`),
        //         axios.get(`${API_Url}/api/cards-categories/`),
        //         axios.get(`${API_Url}/api/chips/`),
        //         axios.get(`${API_Url}/api/chip-colors/`),
        //         axios.get(`${API_Url}/api/material-types/`),
        //         axios.get(`${API_Url}/api/material-colors/`),
        //         axios.get(`${API_Url}/api/magstripe-colors/`),
        //         axios.get(`${API_Url}/api/effects/`)
        //     ])
        //     .then(([
        //         bankResponse,
        //         paymentSystemsResponse,
        //         cardCategoriesResponse,
        //         chipsResponse,
        //         chipColorsResponse,
        //         materialTypesResponse,
        //         materialColorsResponse,
        //         magstripeColorsResponse,
        //         effectsResponse
        //     ]) => {
        //         const modifiedBankKeys = bankResponse.data.map(item => {
        //         return { ...item, value: item.name_eng };
        //         });
        //         setBankNames(modifiedBankKeys);
            
        //         const modifiedPaymentSystemsKeys = paymentSystemsResponse.data.map(item => {
        //         return { ...item, value: item.name };
        //         });
        //         setPaymentSystems(modifiedPaymentSystemsKeys);
            
        //         const modifiedCardCategoriesKeys = cardCategoriesResponse.data.map(item => {
        //         return { ...item, value: item.name };
        //         });
        //         setCardСategories(modifiedCardCategoriesKeys);
            
        //         const modifiedChipsKeys = chipsResponse.data.map(item => {
        //         return { ...item, value: item.short_name };
        //         });
        //         setChipNames(modifiedChipsKeys);
            
        //         const modifiedChipColorsKeys = chipColorsResponse.data.map(item => {
        //         return { ...item, value: item.name };
        //         });
        //         setChipColors(modifiedChipColorsKeys);
            
        //         const modifiedMaterialTypesKeys = materialTypesResponse.data.map(item => {
        //         return { ...item, value: item.name };
        //         });
        //         setMaterialtTypes(modifiedMaterialTypesKeys);
            
        //         const modifiedMaterialColorsKeys = materialColorsResponse.data.map(item => {
        //         return { ...item, value: item.name };
        //         });
        //         setMaterialtColors(modifiedMaterialColorsKeys);
            
        //         const modifiedMagstripeColorsKeys = magstripeColorsResponse.data.map(item => {
        //         return { ...item, value: item.name };
        //         });
        //         setMagstripeColors(modifiedMagstripeColorsKeys);
            
        //         const modifiedEffectsKeys = effectsResponse.data.map(item => {
        //         return { ...item, value: item.short_name };
        //         });
        //         setEffects(modifiedEffectsKeys);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
        // }, []);

      useEffect(() => {
        fetchEffects()
      },[])

        const card_effects = [1]

        const [checkedList, setCheckedList] = useState([]);

           //получение списка эффектов
        const [effects, setEffects] = useState([])
        async function fetchEffects() {
            const list = await fetchEffectsAPI.getAll();
            if (list) {
              const withDefaultValue = list.map(item => {
                  return { ...item, defaultValue: card_effects.includes(item.id) ? true : false };
              });
              setEffects(withDefaultValue); 
            if (card_effects) {
              {card_effects.map(item => {setCheckedList([...checkedList, item])})}

            }
            } 
        }  

        const handleEffectsCheckboxChange = (event) => {
          const value = parseInt(event.target.value, 10);
          const isChecked = event.target.checked;
       
          if (isChecked) {
            // Добавляет номер чекбокса в список
            setCheckedList([...checkedList, value]);
          } else {
            // Удаляет номер чекбокса из списка
            const filteredList = checkedList.filter((item) => item !== value);
            setCheckedList(filteredList);
          }
        };

        console.log(checkedList)

return (
  <TotalBlockCheckBox title={'Эффекты'}>
  {effects.map((item) => (
      <BlockCheckBox
        value={item.id}
        onChange={(e) => handleEffectsCheckboxChange(e)}
        defaultValue={item.defaultValue}
        title={item.value}
      >
      </BlockCheckBox>
     
     
     
     
     
    //  <div className='card-checkbox'>
    //     <label className="card-checkbox__label">
    //         {item.value}
    //         <input 
    //             className="card-checkbox__input"
    //             type="checkbox"
    //             value={item.id}
    //             onChange={(e) => handleEffectsCheckboxChange(e)}
    //             defaultChecked={item.defaultValue}
    //         >
    //         </input>
    //         <span className="card-checkbox__element"></span> 
    //     </label>
    //  </div>

  ))}
</TotalBlockCheckBox>

)
}

export default Test;