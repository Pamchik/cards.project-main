const SpoilerArrowBlock = ({children, title, myStyle, onClick, ...props}) => {
    return (
            <div className="spoiler-arrow__item">
                <div className="spoiler-arrow__title" onClick={onClick}>
                    {title}
                </div>
                <div className="spoiler-arrow__block">
                    <div className="spoiler-arrow__block-content">
                        {children}
                    </div>
                </div>
            </div>
    );
};

export default SpoilerArrowBlock;








