// src/components/ProgressBar.js
import React from 'react';
import '../styles/ProgressBar.css';


const ProgressBar = ({ step }) => {
  const steps = ["Background", "Participants", "Details", "Promoters", "Signature", "Download"];
  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="progress-bar" >
      <div className="progress" style={{ width: `${progress}%` }}></div>
      <div className="steps" >
        {steps.map((s, index) => (
          <div key={index} className={`step ${index + 1 <= step ? 'active' : ''}`} >
            {s} 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
