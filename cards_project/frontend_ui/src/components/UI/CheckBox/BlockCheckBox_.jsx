const BlockCheckBox_ = ({children, myStyle, key, title, value, checked,  ...props}) => {
    return (
        <div className='card-checkbox' style={myStyle} key={key}>
            <label className="card-checkbox__label">
                {title}
                <input 
                    className="card-checkbox__input"
                    type="checkbox"
                    value={value}
                    checked={checked}
                    {...props}
                >
                </input>
                <span className="card-checkbox__element"></span> 
            </label>
        </div>
    );
};


export default BlockCheckBox_;
