import React from 'react';
import '../styles/CertificatePreview.css';
import template1 from  '../assets/Template1.jpg';
import template2 from  '../assets/Template2.jpg';
import template3 from  '../assets/Template3.jpg';
import template4 from  '../assets/Template4.jpg';
import template5 from  '../assets/Template5.jpg';
import template6 from  '../assets/Template6.jpg';
import template7 from  '../assets/Template7.jpg';
import template8 from  '../assets/Template8.jpg';
import template9 from  '../assets/Template9.jpg';
import template10 from '../assets/Template10.jpg';
import template11 from '../assets/Template11.jpg';
import template12 from '../assets/Template12.jpg';
import template13 from '../assets/Template13.jpg';
import template14 from '../assets/Template14.jpg';


const backgrounds = {
  template1, 
  template2, 
  template3, 
  template4, 
  template5, 
  template6, 
  template7, 
  template8, 
  template9, 
  template10,
  template11,
  template12,
  template13,
  template14
};


const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('EN-US', options);
};

const CertificatePreview = ({ data }) => {
  const names = data.participantNames.split('\n').filter(name => name.trim() !== '');
  const backgroundImage = data.customBackground ? URL.createObjectURL(data.customBackground) : backgrounds[data.backgroundImage];
  const name = names[0];

  return (
    <div className= "previewContainer">
      <div className="certificate-preview-container">
        <div
          className="certificate-preview"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className='titleQR'> 
            <h1 className="certificado-title">CERTIFICATE</h1>
            {data.qrCodeImage && <img src={data.qrCodeImage} alt="QR Code" className="qr-code" />}
          </div>

          <div className='textCertificatePreview'> 

            <p className="participantTop">
              We certify that
            </p>

            <p className="participantMiddle">
              {name}
            </p>

            <p className="participantBottom">
              participated in the {data.eventName} as {data.participationMode}, a {data.eventType} promoted by the {data.eventPromoters.join(', ')}, carried out in {data.eventEndDate ? `de ${formatDate(data.eventStartDate)} a ${formatDate(data.eventEndDate)}` : `no dia ${formatDate(data.eventStartDate)}`}

              {data.eventType} intitulado "{data.eventName}" na qualidade de {data.participationMode}, promovido pelo {data.eventPromoters.join(', ')} {data.eventEndDate ? `de ${formatDate(data.eventStartDate)} a ${formatDate(data.eventEndDate)}` : `no dia ${formatDate(data.eventStartDate)}`}, perfazendo uma carga horária de {data.eventDuration} {data.durationUnit}.
            </p>
          </div>

          <div className="signatures-container">
          {data.signatureDetails.map((signature, idx) => (
            <div key={idx} className="signature-container">
              <img src={URL.createObjectURL(signature.image)} alt="Assinatura" className="signature-image" />
              <p className="signature-name">{signature.name}</p>
              <p className="signature-title">{signature.title}</p>
            </div>
          ))}
          </div>

          
          {data.eventLogo.length > 0 && (
            <div className="logos-container">
              {data.eventLogo.map((logo, logoIdx) => (
                <img key={logoIdx} src={URL.createObjectURL(logo)} alt={`Logomarca ${logoIdx}`} className="event-logo" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificatePreview;

