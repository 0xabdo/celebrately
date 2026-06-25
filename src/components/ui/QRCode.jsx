import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

export default function QRCode({
  value,
  size = 160,
  accentColor = '#d4913a',
  title = 'Scan to visit',
  showDownload = true,
}) {
  const url = value || window.location.href;

  function downloadQR() {
    const canvas = document.querySelector('#qr-canvas canvas');
    if (!canvas) return;
    const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = 'celebrately-qr.png';
    a.click();
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-4"
    >
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        {title}
      </p>
      <div
        className="p-4 bg-white rounded-2xl shadow-lg"
        id="qr-canvas"
        style={{ border: `3px solid ${accentColor}40` }}
      >
        <QRCodeSVG
          value={url}
          size={size}
          bgColor="#ffffff"
          fgColor="#1f2937"
          level="H"
          includeMargin={false}
        />
      </div>
      {showDownload && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadQR}
          className="flex items-center gap-2 text-sm font-medium px-5 py-2 rounded-full text-white transition-all"
          style={{ background: accentColor }}
        >
          <Download size={14} />
          Download QR
        </motion.button>
      )}
    </motion.div>
  );
}
