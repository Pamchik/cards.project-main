
const BlockTextarea = ({ myStyle, myStyleTextarea, title, type, rows, ...props }) => {
  
  let textareaProps = { rows, type, ...props };

  if (type === 'number') {
    textareaProps = {
      ...textareaProps,
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
      <textarea className="text-field__textarea" style={myStyleTextarea} {...textareaProps}></textarea>
    </div>
  );
};
  
  
export default BlockTextarea;

