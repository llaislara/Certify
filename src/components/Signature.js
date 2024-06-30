import React, { useEffect } from 'react';
import '../styles/Signature.css';
import CloudIcon from '../assets/icons/cloudDownload.svg';
import EditIcon from '../assets/icons/Edit.svg';
import Trash from '../assets/icons/Trash.svg';
import AddButton from '../assets/icons/AddButton.svg';
import Before from '../assets/icons/BeforeArrow.svg'
import After from '../assets/icons/NextArrow.svg'

const Signature = ({
  formData,
  handleSignatureChange,
  addSignature,
  removeSignature,
  nextStep,
  prevStep
}) => {

  useEffect(() => {
    if (formData.signatureDetails.length === 0) {
      addSignature();
    }
  }, []);

  const allSignaturesFilled = () => {
    if (formData.signatureDetails.length > 3) return false;

    for (let signature of formData.signatureDetails) {
      if (!signature.image || signature.name.trim() === '' || signature.title.trim() === '') {
        return false;
      }
    }

    return true;
  };

  const handleRemoveImage = (index) => {
    const updatedSignatures = [...formData.signatureDetails];
    updatedSignatures[index].image = null;
    handleSignatureChange(index, { target: { name: 'image', value: null } });
  };

  return (
    <div className='bgBox'>
      <div className='NextBackStep'>
        <button onClick={prevStep}><img src={Before} alt="Upload Icon" style={{width: 18}}/></button>
        <button onClick={nextStep} disabled={!allSignaturesFilled()}><img src={After} alt="Upload Icon" style={{width: 18}}/></button>
      </div>

      <div className='boxSignature'> 
        <h1 className='titleLabel'>Signature(s)</h1>

        {formData.signatureDetails.map((signature, index) => (
          <div className='boxSignatureItens' key={index}>

            <label className='inputSignature'>
              <p>Name:</p>
              <input type="text" name="name" value={signature.name} onChange={(e) => handleSignatureChange(index, e)} style={{background: '#efefef', boxShadow: 'inset 0px 0px 3px 3px rgb(0 0 0 / 3.5%)' }} />
            </label>

            <label className='inputSignature'>
              <p>Office:</p>
              <input type="text" name="title" value={signature.title} onChange={(e) => handleSignatureChange(index, e)} style={{background: '#efefef', boxShadow: 'inset 0px 0px 3px 3px rgb(0 0 0 / 3.5%)' }}/>
            </label>

            <div className='inputSignature'>
              <label className="custom-file-upload">
                <input type="file" name="image" accept="image/*" onChange={(e) => handleSignatureChange(index, e)} style={{ display: 'none' }} />
                {!signature.image && (
                  <div className='svgSignature' onClick={() => document.querySelector(`input[name="image"][data-index="${index}"]`)}>
                    <img src={CloudIcon} alt="Upload Icon" style={{width: 80}}/>
                    <p>Upload Signature</p>
                  </div>
                )}
              </label>
              {signature.image && (
                <div className='miniatureSignature' style={{marginTop: 30}}>
                  <img src={URL.createObjectURL(signature.image)} alt="Assinatura" style={{ minWidth: 150, maxWidth: 200, borderRadius: 10 }} />
                  <button type="button" onClick={() => handleRemoveImage(index)} style={{ backgroundColor: 'transparent', width: 30 }}>
                    <img src={EditIcon} alt="Upload Icon" style={{width: 80}}/>
                  </button>
                </div>
              )}
            </div>

            <div className='removeSignature'>
              {formData.signatureDetails.length > 1 && (
                <button className="buttonSignature" type="button" onClick={() => removeSignature(index)}>
                  <img src={Trash} alt="Upload Icon" style={{width: 20, marginTop: 10}}/>
                </button>
              )}
            </div>
            <hr/>
          </div>
        ))}

        {formData.signatureDetails.length < 3 && (
          <button className="buttonAddSignature" type="button" onClick={addSignature}>
            <img src={AddButton} alt="Upload Icon" style={{width: 30}}/>
          </button>
        )}
      </div>
    </div>
  );
};

export default Signature;
