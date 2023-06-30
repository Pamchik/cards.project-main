const DiscriptionList = ({title, children, myStyle, line, ...props}) => {

    let isLine;
    if (line==='not-line') {
        isLine = { '--before-content': 'none' }
    } else {
        isLine = { '--before-content': `''` }
    }

    const newStyle={...myStyle, ...isLine}

    return (
        <div className="card-description" style={newStyle}>
            <p className="card-description__title">{title}</p>
            <div className="card-description__content">
                {children}
            </div>
        </div>
    );
};

export default DiscriptionList;