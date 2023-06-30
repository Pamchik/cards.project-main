import React, { useState, useEffect } from 'react';

const UploadForm = ({
  previewImage,
  addNewPreview
}) => {

  // функция добавления изображения в карточку заказа
    const [selectedImage, setSelectedImage] = useState(null);  
    const [imageName, setImageName] = useState('Выберите изображение');

    useEffect(() => {
      setSelectedImage(previewImage)
    },[previewImage])

    const handleImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        const file = new FileReader();
        file.onload = (e) => {
          setSelectedImage(e.target.result);
          setImageName(event.target.files[0].name);
        };
        file.readAsDataURL(event.target.files[0]);
        const fileLoaded = event.target.files[0];
        addNewPreview(fileLoaded)
      } 
    };

  
  return (
    <div className="general-card-info__block-picture">
        <div className="general-card-info__form">
          {imageName === 'Выберите изображение' ? (
              <label className="general-card-info__label" htmlFor="image-input">
                {imageName}
              </label>            
            ) : (
              <label className="general-card-info__label" htmlFor="image-input">
                <svg/>
                {imageName}
              </label>            
            )
          }
            <input
                    className="general-card-info__input"
                    type="file"
                    id="image-input"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            <img
                    className="general-card-info__picture"
                    src={selectedImage}
                />

        </div>
    </div>

  );
};

export default UploadForm;



