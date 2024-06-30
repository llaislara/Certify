// src/components/QRCodeGenerator.js
import QRCode from 'qrcode';

const QRCodeGenerator = async (text) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text);
    return qrCodeDataUrl;
  } catch (error) {
    console.error('Failed to generate QR code', error);
    return null;
  }
};

export default QRCodeGenerator;
