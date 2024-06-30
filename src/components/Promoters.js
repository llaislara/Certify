import React from 'react';
import '../styles/Promoters.css';
import TrashIcon from '../assets/icons/Trash.svg';
import AddButton from '../assets/icons/AddButton.svg';
import CloudIcon from '../assets/icons/cloudDownload.svg';
import Before from '../assets/icons/BeforeArrow.svg'
import After from '../assets/icons/NextArrow.svg'

const Promoters = ({
  formData,
  handleFileChange,
  addPromoter,
  removePromoter,
  handlePromoterChange,
  addLogo,
  removeLogo,
  handleLogoChange,
  nextStep,
  prevStep,
  missingFields
}) => {

  const isMissing = (field) => missingFields.includes(field);

  const allFieldsFilled = () => {
    if (formData.eventPromoters.length === 0) return false;

    for (let promoter of formData.eventPromoters) {
      if (promoter.trim() === '') return false;
    }

    for (let logo of formData.eventLogo) {
      if (!logo) return false;
    }

    return true;
  };

  return (
    <div className='bgBox'>
      <div className='NextBackStep'>
        <button onClick={prevStep}><img src={Before} alt="Upload Icon" style={{width: 18}}/></button>
        <button onClick={nextStep}  disabled={!allFieldsFilled()}><img src={After} alt="Upload Icon" style={{width: 18}}/></button>
      </div>

      <div className='promoterBox'>
        <label className={isMissing('promotersName') ? 'missing' : ''}>
          <h1 className='titleLabel'>Promoters *</h1>

          {formData.eventPromoters.map((promoter, index) => (
            <div className='promoterBoxAdd' key={index}>
              <input
                type="text"
                name="promotersName"
                value={promoter}
                onChange={(e) => handlePromoterChange(index, e)}
                required
              />
              
              {index > 0 && (
                <button type="button" onClick={() => removePromoter(index)} style={{ width: 30, backgroundColor: 'transparent' }}>
                  <img src={TrashIcon} alt="Trash Icon" style={{ width: 18 }} />
                </button>
              )}
            </div>
            
          ))}

          <button className='buttonAddPromoters' type="button" onClick={addPromoter}>
            <img src={AddButton} alt="Add Icon" style={{ width: 30 }} />
          </button>

        </label>
        <hr />
        <br />

        <div className='logoPromoter'>
          <h1 className='titleLabel'>Promoters' logo</h1>
          <div className='logoUpload'>
            {formData.eventLogo.map((logo, index) => (
              <div className='promoterBoxAdd' key={index}>
                {logo ? (
                  <div className='miniatureLogo'>
                    <img src={URL.createObjectURL(logo)} alt="Logo" style={{ minHeight: 100, maxHeight: 100, maxWidth: 100, borderRadius: 10 }} />
                    <button className='buttonRemoveLogo' type="button" onClick={() => removeLogo(index)} style={{ backgroundColor: 'transparent', width: 30 }}>
                      <img src={TrashIcon} alt="Trash Icon" style={{ width: 18 }} />
                    </button>
                  </div>
                ) : (
                  <label className="uploadFiles">
                    <div className='uploadFile'>
                      <input type="file" onChange={(e) => handleLogoChange(index, e)} required />
                      <img src={CloudIcon} alt="Upload Icon" style={{ width: 80 }} />
                      <p>Upload File</p>
                    </div>

                    <div className='removeFile'> 
                      <button className='buttonRemoveLogo' type="button" onClick={() => removeLogo(index)} style={{ backgroundColor: 'transparent', width: 30 }}>
                        <img src={TrashIcon} alt="Trash Icon" style={{ width: 18 }} />
                      </button>
                    </div>
                  </label>
                )}
              </div>
            ))}
          </div>

          {formData.eventLogo.length < 8 && (
            <button className='buttonAddPromoters' type="button" onClick={addLogo}>
              <img src={AddButton} alt="Add Icon" style={{ width: 30 }} />
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Promoters;
