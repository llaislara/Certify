// src/components/ParticipantName.js
import '../styles/ParticipantName.css';
import React from 'react';
import Before from '../assets/icons/BeforeArrow.svg'
import After from '../assets/icons/NextArrow.svg'

const ParticipantName = ({ formData, handleChange, nextStep, prevStep, missingFields }) => {
  const countNames = (names) => {
    return names.split('\n').filter((name) => name.trim() !== '').length;
  };

  const isMissing = (field) => missingFields.includes(field);

  return (
    <div className='bgBox'>
      <div className='NextBackStep'>
      <button onClick={prevStep}><img src={Before} alt="Upload Icon" style={{width: 18}}/></button>
      <button onClick={nextStep}><img src={After} alt="Upload Icon" style={{width: 18}}/></button>
      </div>
      <div className='participantsBox'> 
        <label >
          <h1 className='titleLabel'>Participants' Names * </h1>
          <span> separated by line break </span>
          <textarea 
            className={`textarea ${isMissing('participantNames') ? 'missing' : ''}`} 
            name="participantNames" 
            onChange={handleChange} 
            value={formData.participantNames} 
            required 
          />
        </label>
  
       
        <p>Total de Participantes: {countNames(formData.participantNames)}</p>
      </div>
    </div>
  );
};

export default ParticipantName;
