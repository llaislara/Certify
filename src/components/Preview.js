import React from 'react';
import CertificatePreview from './CertificatePreview';
import DownloadIcon from '../assets/icons/Download.svg'
import ReloadIcon from '../assets/icons/Reload.svg'
import Before from '../assets/icons/BeforeArrow.svg'

const Preview = ({ formData, downloadCertificates, prevStep, restartApp, missingFields }) => {
  return (
    <div className='bgBoxPreview'>
      <div className='NextBackStep' style={{width:100, alignContent: 'flex-start'}}>
        <button onClick={prevStep}><img src={Before} alt="Upload Icon" style={{width: 18}}/></button>
      </div>
      <h1 className='titleLabelPreview'>Certificate Preview</h1>

      {missingFields.length > 0 && (
        <div className="error">
          <h3>Erro: Campos obrigatórios não preenchidos:</h3>
          <ul>
            {missingFields.map((field, index) => (
              <li key={index}>{field}</li>
            ))}
          </ul>
        </div>
      )}
      <CertificatePreview data={formData} />

      <div className="post-download-buttons">
        <button className="previewButton" onClick={downloadCertificates} style={{scale: '1.3'}}>
          Download
          <img src={DownloadIcon} alt="Upload Icon" style={{width: 18}}/>
        </button>
      </div>

      <div className="post-reload-buttons">
        <button className="previewButtonRestart" onClick={restartApp}>
          Regenerate
          <img src={ReloadIcon} alt="Upload Icon" style={{width: 13}}/>
        </button>
      </div>
    </div>
  );
};

export default Preview;
