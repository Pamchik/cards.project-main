const BlockCheckBox = ({children, myStyle, title, value, defaultValue, onChange, ...props}) => {


    return (
        <div className='card-checkbox' style={myStyle} key={value}>
            <label className="card-checkbox__label">
                {title}
                <input 
                    className="card-checkbox__input"
                    type="checkbox"
                    value={value}
                    onChange={onChange}
                    defaultChecked={defaultValue}
                    {...props}
                >
                </input>
                <span className="card-checkbox__element"></span> 
            </label>
        </div>
    );
};


export default BlockCheckBox;
