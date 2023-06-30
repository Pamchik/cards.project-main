import React from 'react';

const PictureBlock = ({previewImage}) => {
    return (
        <div className="general-card-info__block-picture">
            <div className="general-card-info__form">
                <img className="general-card-info__picture"
                    src={previewImage}
                />
            </div>
        </div>
    );
};

export default PictureBlock;