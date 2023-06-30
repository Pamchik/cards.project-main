import React, { useEffect, useRef } from 'react';

const BlockSelect = ({ myStyle, myStyleField, options, defaultValue, value, onChange, title, ...props}) => {
    
    const selectRef = useRef(null);

    useEffect(() => {
        if (selectRef.current) {
            selectRef.current.value = defaultValue; 
            onChange(defaultValue);
        }
    }, [options]);

    return (
        <div className='text-field' style={myStyle} >
            <label className="text-field__label">{title}</label>
            <select 
                className="text-field__select" 
                style={myStyleField}
                ref={selectRef}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            >
            <option value=""></option>

            {options.map(option => 
                <option key={option.id} value={option.id}>
                    {option.value}
                </option>
            )}
            </select>
        </div>
    );
};
  
  export default BlockSelect;