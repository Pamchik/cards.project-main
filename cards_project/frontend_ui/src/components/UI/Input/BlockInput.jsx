
const BlockInput = ({ myStyle, type, title, ...props }) => {
  
  let inputProps = { type, ...props };

  if (type === 'number') {
    inputProps = {
      ...inputProps,
      onKeyPress: (event) => {
        const keyCode = event.which || event.keyCode;
        const isValidInput = keyCode >= 48 && keyCode <= 57;
    
        if (!isValidInput) {
          event.preventDefault();
        }
      }
    };
  }

  return (
    <div className='text-field' style={myStyle}>
      <label className="text-field__label">{title}</label>
      <input className="text-field__input" {...inputProps}/>
    </div>
  );
};
  
  
export default BlockInput;