import React, { useRef, useEffect } from 'react';

interface CertificateGeneratorProps {
  userName?: string;
  date?: string;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({ userName, date }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = 1200;
    canvas.height = 840;

    // 1. Background Fill
    ctx.fillStyle = "#FFFDF6"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Borders (Double Border Styling)
    ctx.strokeStyle = "#C99A49"; 
    ctx.lineWidth = 12;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    ctx.strokeStyle = "#800000"; 
    ctx.lineWidth = 3;
    ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);

    // 3. Corner Flowers
    const drawFlower = (x: number, y: number) => {
      ctx.fillStyle = "#D22B2B";
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    };
    drawFlower(55, 55);
    drawFlower(canvas.width - 55, 55);
    drawFlower(55, canvas.height - 55);
    drawFlower(canvas.width - 55, canvas.height - 55);

    // ==========================================
    // 4. SATGURU KABIR SAHEB CIRCULAR LOGO MASKING
    // ==========================================
    const logoImg = new Image();
    logoImg.src = '/assets/images/kabir_saheb_maghar.jpg'; 
    logoImg.crossOrigin = "anonymous"; // Prevents tainted canvas errors

    logoImg.onload = () => {
      const centerX = canvas.width / 2;
      const centerY = 105; // Position from top
      const radius = 45;   // 45px radius for circle mask

      ctx.save(); // Save canvas context state
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip(); // Mask applied here

      // Draw the image inside the masked circle
      ctx.drawImage(logoImg, centerX - radius, centerY - radius, radius * 2, radius * 2);
      ctx.restore(); // Restore context state to remove mask for next text drawing

      // Continue drawing text after image loads to prevent blank spaces
      drawAllTextElements(ctx, canvas, userName, date);
    };

    // Fallback if image fails to load
    logoImg.onerror = () => {
      drawAllTextElements(ctx, canvas, userName, date);
    };

  }, [userName, date]);

  // Helper function for text layers
  const drawAllTextElements = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, userName?: string, date?: string) => {
    ctx.textAlign = "center";
    ctx.fillStyle = "#FF4500";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("।।सत्यनाम।।", canvas.width / 2, 185);

    ctx.fillStyle = "#800000";
    ctx.font = "bold 44px sans-serif";
    ctx.fillText("पावन स्वाध्याय आशीर्वाद पत्र", canvas.width / 2, 250);

    ctx.fillStyle = "#555555";
    ctx.font = "italic 20px sans-serif";
    ctx.fillText("श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ — साहेब वर्ल्ड", canvas.width / 2, 290);

    ctx.fillStyle = "#333333";
    ctx.font = "24px sans-serif";
    ctx.fillText("सप्रेम प्रमाणित किया जाता है कि परम श्रद्धालु हंस जन:", canvas.width / 2, 370);

    ctx.fillStyle = "#D22B2B";
    ctx.font = "bold 38px sans-serif";
    ctx.fillText(userName || "सत्य साधक (हंस जन)", canvas.width / 2, 440);

    ctx.fillStyle = "#333333";
    ctx.font = "22px sans-serif";
    ctx.fillText("ने सद्गुरु कबीर साहेब के पावन ११-चरणीय स्वाध्याय एवं अंतःकरण सत्संग", canvas.width / 2, 500);
    ctx.fillText("को पूर्ण श्रद्धा, एकाग्रता एवं सत्य-संकल्प के साथ संपन्न किया है।", canvas.width / 2, 540);

    ctx.strokeStyle = "#C99A49";
    ctx.lineWidth = 2;
    ctx.strokeRect(200, 590, canvas.width - 400, 80);
    
    ctx.fillStyle = "#800000";
    ctx.font = "bold italic 22px sans-serif";
    ctx.fillText('"पूरन भये मनोरथा, सतगुरु दई लखाय। कहैं कबीर सो हंस जन, अमरलोक में जाय."', canvas.width / 2, 638);

    ctx.fillStyle = "#555555";
    ctx.font = "18px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`दिनांक: ${date || "13 अक्टूबर 2026"}`, 70, 760);

    ctx.textAlign = "right";
    ctx.fillStyle = "#FF4500";
    ctx.fillText("।। साहेब बंदगी साहेब ।। 🙏", canvas.width - 70, 760);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.download = `Saheb-World-Aashirwad-Patra-${userName || 'HansJan'}.png`;
    link.href = image;
    link.click();
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <canvas ref={canvasRef} style={{ width: '100%', maxWidth: '700px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', borderRadius: '8px' }} />
      <br />
      <button onClick={downloadCertificate} style={{ marginTop: '20px', padding: '12px 28px', backgroundColor: '#800000', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
        आशीर्वाद पत्र डाउनलोड करें (PNG)
      </button>
    </div>
  );
};

export default CertificateGenerator;
