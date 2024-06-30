import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Menu from './components/Menu';
import ProgressBar from './components/ProgressBar';
import Background from './components/Background';
import ParticipantName from './components/ParticipantName';
import ActivityDetails from './components/ActivityDetails';
import Promoters from './components/Promoters';
import Signature from './components/Signature';
import Preview from './components/Preview';
import { jsPDF } from 'jspdf';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode';
import './App.css';
import template1 from  './assets/Template1.jpg';
import template2 from  './assets/Template2.jpg';
import template3 from  './assets/Template3.jpg';
import template4 from  './assets/Template4.jpg';
import template5 from  './assets/Template5.jpg';
import template6 from  './assets/Template6.jpg';
import template7 from  './assets/Template7.jpg';
import template8 from  './assets/Template8.jpg';
import template9 from  './assets/Template9.jpg';
import template10 from './assets/Template10.jpg';
import template11 from './assets/Template11.jpg';
import template12 from './assets/Template12.jpg';
import template13 from './assets/Template13.jpg';
import template14 from './assets/Template14.jpg';

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
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options); 
};

function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    participantNames: '',
    eventName: '',
    eventDuration: '',
    durationUnit: 'hours',
    participationMode: 'Audience',
    customParticipationMode: '',
    eventLocation: '',
    eventType: 'Academic League',
    customEventType: '',
    eventCondition: 'Seminário',
    eventPromoters: [''],
    eventStartDate: '',
    eventEndDate: '',
    showEndDate: false,
    backgroundImage: '',
    customBackground: null,
    signatureDetails: [],
    eventLogo: [],
    logoTop: null,
    logoBottom: null,
    qrCodeLink: '',
    qrCodeImage: null
  });
  const [missingFields, setMissingFields] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({
      ...formData,
      [name]: e.target.files[0]
    });
  };

  const handleSignatureChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedSignatures = formData.signatureDetails.map((signature, i) => {
      if (i === index) {
        return {
          ...signature,
          [name]: files ? files[0] : value
        };
      }
      return signature;
    });
    setFormData({ ...formData, signatureDetails: updatedSignatures });
  };

  const addSignature = () => {
    setFormData({
      ...formData,
      signatureDetails: [...formData.signatureDetails, { image: null, name: '', title: '' }]
    });
  };

  const removeSignature = (index) => {
    const updatedSignatures = formData.signatureDetails.filter((_, i) => i !== index);
    setFormData({ ...formData, signatureDetails: updatedSignatures });
  };

  const addPromoter = () => {
    setFormData({
      ...formData,
      eventPromoters: [...formData.eventPromoters, '']
    });
  };

  const removePromoter = (index) => {
    const updatedPromoters = formData.eventPromoters.filter((_, i) => i !== index);
    setFormData({ ...formData, eventPromoters: updatedPromoters });
  };

  const handlePromoterChange = (index, e) => {
    const updatedPromoters = formData.eventPromoters.map((promoter, i) => {
      if (i === index) {
        return e.target.value;
      }
      return promoter;
    });
    setFormData({ ...formData, eventPromoters: updatedPromoters });
  };

  const handleLogoChange = (index, e) => {
    const { files } = e.target;
    const updatedLogos = formData.eventLogo.map((logo, i) => {
      if (i === index) {
        return files[0];
      }
      return logo;
    });
    setFormData({ ...formData, eventLogo: updatedLogos });
  };

  const addLogo = () => {
    setFormData({
      ...formData,
      eventLogo: [...formData.eventLogo, null]
    });
  };

  const removeLogo = (index) => {
    const updatedLogo = formData.eventLogo.filter((_, i) => i !== index);
    setFormData({ ...formData, eventLogo: updatedLogo });
  };

  const handleBackgroundChange = (background) => {
    setFormData({
      ...formData,
      backgroundImage: background
    });
  };

  const toggleEndDate = () => {
    setFormData({
      ...formData,
      showEndDate: !formData.showEndDate,
      eventEndDate: !formData.showEndDate ? formData.eventEndDate : ''
    });
  };

  const validateFields = (requiredFields) => {
    const missing = [];
    requiredFields.forEach(field => {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        missing.push(field);
      }
    });
    return missing;
  };

  const nextStep = () => {
    let requiredFields = [];
    switch (step) {
      case 1:
        requiredFields = ['backgroundImage'];
        break;
      case 2:
        requiredFields = ['participantNames'];
        break;
      case 3:
        requiredFields = ['eventName', 'eventDuration', 'eventLocation', 'eventStartDate'];
        break;
      case 4:
        requiredFields = ['eventPromoters'];
        break;
      case 5:
        requiredFields = ['signatureDetails'];
        break;
      default:
        break;
    }

    const missing = validateFields(requiredFields);

    if (missing.length > 0) {
      setMissingFields(missing);
    } else {
      setStep(step + 1);
      setMissingFields([]);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setMissingFields([]);
  };
  

  const startApp = () => {
    setStep(1); 
  };

  const generateQRCode = async (link) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(link);
      setFormData(prevFormData => ({
        ...prevFormData,
        qrCodeImage: qrCodeDataUrl
      }));
    } catch (error) {
      console.error('Failed to generate QR code', error);
    }
  };

  const downloadCertificates = async () => {
    const zip = new JSZip();
    const names = formData.participantNames.split('\n').filter(name => name.trim() !== '');
    const backgroundImage = formData.customBackground ? URL.createObjectURL(formData.customBackground) : backgrounds[formData.backgroundImage];

    for (const name of names) {
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [1600, 1000]
      });

      doc.addImage(backgroundImage, 'JPEG', 0, 0, 1600, 1000);

      doc.setFontSize(100);
      doc.setFont('helvetica', 'bold');
      doc.text('CERTIFICATE', 800, 200, null, null, 'center');

      doc.setFontSize(40);
      doc.setFont('helvetica', 'normal');

      let eventPromoters;
      if (formData.eventPromoters.length > 1) {
        const lastPromoter = formData.eventPromoters.pop();
        eventPromoters = formData.eventPromoters.join(', ') + ' and ' + lastPromoter;
      } else {
        eventPromoters = formData.eventPromoters[0];
      }

      const eventDates = formData.eventEndDate ? `between ${formatDate(formData.eventStartDate)} and ${formatDate(formData.eventEndDate)}` : `in ${formatDate(formData.eventStartDate)}`;

      const certificateText1 = 'We certify that ';
      const certificateText2 = `participated in the ${formData.eventName} as ${formData.customParticipationMode || formData.participationMode}, a ${formData.customEventType || formData.eventType} promoted by the ${eventPromoters}, carried out  ${eventDates}, totaling ${formData.eventDuration} ${formData.durationUnit} of participation.`;

      const textX = 800;
      const textY = 320;
      const textWidth = 1300;

      doc.text(certificateText1, textX, textY, { maxWidth: textWidth, align: 'center' });
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(70); 
      doc.text(name, textX, textY + 80, { maxWidth: textWidth, align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(40);
      doc.text(certificateText2, textX, textY + 150, { maxWidth: textWidth, align: 'center' });

      if (formData.qrCodeImage) {
        const qrCodeSize = 150;
        const qrCodeX = 1340;
        const qrCodeY = 45;
        const borderRadius = 10;

        doc.setFillColor(255, 255, 255); 
        doc.roundedRect(qrCodeX - 5, qrCodeY - 5, qrCodeSize + 10, qrCodeSize + 10, borderRadius, borderRadius, 'F');

        doc.addImage(formData.qrCodeImage, 'JPEG', qrCodeX, qrCodeY, qrCodeSize, qrCodeSize);
      }

      formData.signatureDetails.forEach((signature, idx) => {
        const imgData = URL.createObjectURL(signature.image);
        const totalSignatures = formData.signatureDetails.length;
        const imgWidth = 190 * (2 / 3); 
        const imgHeight = 90 * (2 / 3); 
        const margin = 150; 

        const totalImgWidth = totalSignatures * imgWidth + (totalSignatures - 1) * margin;

        const centerX = (doc.internal.pageSize.getWidth() - totalImgWidth) / 2;

        const x = centerX + idx * (imgWidth + margin);
        const y = 630;

        doc.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
        doc.setFontSize(25);
        doc.text(signature.name, x + imgWidth / 2, y + imgHeight + 20, null, null, 'center');
        doc.setFontSize(18);
        doc.text(signature.title, x + imgWidth / 2, y + imgHeight + 40, null, null, 'center');
      });

      const totalLogos = formData.eventLogo.length;
      const logoWidth = 150;
      const logoHeight = 150;
      const logoMargin = 15; 

      const totalLogosWidth = totalLogos * logoWidth + (totalLogos - 1) * logoMargin;

      const logosCenterX = (doc.internal.pageSize.getWidth() - totalLogosWidth) / 2;

      formData.eventLogo.forEach((logo, logoIdx) => {
        const logoData = URL.createObjectURL(logo);
        const x = logosCenterX + logoIdx * (logoWidth + logoMargin);
        const y = doc.internal.pageSize.getHeight() - logoHeight - 70; 

        doc.addImage(logoData, 'JPEG', x, y, logoWidth, logoHeight);
      });

      const pdfBlob = doc.output('blob');
      zip.file(`${name}.pdf`, pdfBlob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'certificates.zip');
  };


  const restartApp = () => {
  setStep(1);
  setFormData({
    participantNames: '',
    eventName: '',
    eventDuration: '',
    durationUnit: 'hours',
    participationMode: 'Audience',
    customParticipationMode: '',
    eventLocation: '',
    eventType: 'Academic League',
    customEventType: '',
    eventCondition: 'Seminário',
    eventPromoters: [''],
    eventStartDate: '',
    eventEndDate: '',
    showEndDate: false,
    backgroundImage: '',
    customBackground: null,
    signatureDetails: [],
    eventLogo: [],
    logoTop: null,
    logoBottom: null,
    qrCodeLink: '',
    qrCodeImage: null
  });
  setMissingFields([]);
};

  

  return (
    <div>
    <Menu startApp={startApp} />
    {step === 0 ? (
      <div className='LandingPage'> 
        <LandingPage startApp={startApp} />
      </div>
    ) : (
      <>
        <div className="App"> 
          <div className="appItens"> 
            <ProgressBar step={step} />
            {step === 1 && <Background formData={formData} handleBackgroundChange={handleBackgroundChange} handleFileChange={handleFileChange} nextStep={nextStep} missingFields={missingFields} />}
            {step === 2 && <ParticipantName formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} missingFields={missingFields} />}
            {step === 3 && <ActivityDetails formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} toggleEndDate={toggleEndDate} generateQRCode={generateQRCode} missingFields={missingFields} />}
            {step === 4 && <Promoters formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} addPromoter={addPromoter} removePromoter={removePromoter} handlePromoterChange={handlePromoterChange} addLogo={addLogo} removeLogo={removeLogo} handleLogoChange={handleLogoChange} nextStep={nextStep} prevStep={prevStep} setFormData={setFormData} missingFields={missingFields} />}
            {step === 5 && <Signature formData={formData} handleSignatureChange={handleSignatureChange} addSignature={addSignature} removeSignature={removeSignature} nextStep={nextStep} prevStep={prevStep} missingFields={missingFields} />}
            {step === 6 && <Preview formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} prevStep={prevStep} downloadCertificates={downloadCertificates} restartApp={restartApp} missingFields={missingFields} />}
          </div>          
        </div>
      </>
    )}
  </div>
);
}

export default App;
