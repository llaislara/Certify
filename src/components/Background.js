import React, { useState } from 'react';
import BackgroundSelect from './BackgroundSelect';
import '../styles/Background.css';
import CloudIcon from '../assets/icons/cloudDownload.svg';
import TrashIcon from '../assets/icons/Trash.svg'
import Before from '../assets/icons/BeforeArrow.svg'
import After from '../assets/icons/NextArrow.svg'

const Background = ({ formData, handleBackgroundChange, handleFileChange, nextStep, prevStep, missingFields }) => {
  const [useCustomBackground, setUseCustomBackground] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');
  const [customBackgroundFile, setCustomBackgroundFile] = useState(null);
  const customBackgroundDimensions = { width: 1600, height: 1000 };
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleCustomBackgroundToggle = () => {
    setUseCustomBackground(!useCustomBackground);
    setCustomBackgroundFile(null);
    setFileName('No file chosen');
  };

  const isMissing = (field) => missingFields.includes(field);

  const handleCustomBackgroundFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (fileEvent) => {
        const image = new Image();
        image.onload = () => {
          const { width, height } = image;

          if (width === customBackgroundDimensions.width && height === customBackgroundDimensions.height) {
            if (file.size <= MAX_FILE_SIZE) {
              handleFileChange(event);
              setCustomBackgroundFile(file);
              setFileName(file.name);
            } else {
              const errorMessage = `File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB. Please upload a smaller image.`;
              console.error(errorMessage);
              alert(errorMessage);
              setFileName('No file chosen');
            }
          } else {
            const errorMessage = `Invalid image dimensions. Expected: ${customBackgroundDimensions.width}px x ${customBackgroundDimensions.height}px.`;
            console.error(errorMessage);
            alert(errorMessage);
            setFileName('No file chosen');
          }
        };
        image.src = fileEvent.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      if (useCustomBackground) {
        console.error('No file selected for custom background.');
      }
      setFileName('No file chosen');
    }
  };

  return (
    <div className='bgBox'>
      <div className='NextBackStep'>
        <button style={{ opacity: 0.3 }} onClick={prevStep}><img src={Before} alt="Upload Icon" style={{width: 18}}/></button>
        <button onClick={nextStep}><img src={After} alt="Upload Icon" style={{width: 18}}/></button>
      </div>

      <div className='BoxStep'>
        <div className={`label ${isMissing('backgroundImage') ? 'missing' : ''}`}> 
          <div className='BoxStepItens'>
            <label className='labelBackground'>
              <input
                type="checkbox"
                checked={useCustomBackground}
                onChange={handleCustomBackgroundToggle}
              />
              <p>Personalized Background</p>
            </label>
            {useCustomBackground ? (
              <div >
                <div className='logoPromoter'>
                  <div className='logoUpload' style={{ display: 'flex' }}>
                    {!customBackgroundFile ? (
                      <label className="custom-file-upload">
                        <input
                          type="file"
                          id="customBackground"
                          name="customBackground"
                          accept="image/png, image/jpeg"
                          onChange={handleCustomBackgroundFileChange}
                          className="custom-file-input"
                        />
                        <img src={CloudIcon} alt="Upload Icon"/>
                        <p>Upload File</p>
                      </label>
                    ) : (
                      <div className='miniatureLogoBackground'>
                        <img
                          src={URL.createObjectURL(customBackgroundFile)}
                          alt="Background"
                          style={{ minHeight: 110, maxHeight: 110, maxWidth: 160, borderRadius: 3 }}
                        />
                        <button
                          className='buttonAddBackground'
                          type="button"
                          onClick={() => {
                            handleFileChange({ target: { files: [] } });
                            setCustomBackgroundFile(null);
                            setFileName('No file chosen');
                          }}
                          style={{ backgroundColor: 'transparent', width: 30 }}
                        >
                          <img src={TrashIcon} alt="Upload Icon" style={{width: 18}}/>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <BackgroundSelect onChange={handleBackgroundChange} value={formData.backgroundImage} />
              </div>
            )}
            {isMissing('backgroundImage') && (
              <div className="error-message">Please select a background image.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;