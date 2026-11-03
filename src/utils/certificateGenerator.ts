// Expert HTML5 Canvas Certificate Generator
// Generates the "पावन स्वाध्याय आशीर्वाद पत्र" (Pavan Swadhyay Ashirwad Patra) with 100% offline PNG download.

export async function generateAndDownloadCertificate(
  userName: string,
  _verse?: string,
  _mantra?: string,
  _lang?: string
): Promise<void> {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const date = new Date().toLocaleDateString('hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // 1. BACKGROUND & DOUBLE BORDER
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, 1200, 800);

  // Outer thick golden/red line
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#D4AF37'; // Golden
  ctx.strokeRect(35, 35, 1130, 730);

  // Inner thin maroon line
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#8B0000'; // Maroon
  ctx.strokeRect(55, 55, 1090, 690);

  // Small red rose graphics at all four inner corners
  const drawCornerRose = (x: number, y: number) => {
    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌹', x, y);
  };
  drawCornerRose(80, 80);
  drawCornerRose(1120, 80);
  drawCornerRose(80, 720);
  drawCornerRose(1120, 720);

  // 2. TOP LOGO: 45px circular masked image of Satguru Kabir Saheb at top center
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/images/kabir_saheb_maghar.jpg';
    await new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
    });

    if (img.complete && img.naturalWidth > 0) {
      ctx.save();
      const logoX = 600;
      const logoY = 110;
      const radius = 45; // 45px radius circular emblem

      // Golden ring
      ctx.beginPath();
      ctx.arc(logoX, logoY, radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = '#D4AF37';
      ctx.fill();

      // Clip mask
      ctx.beginPath();
      ctx.arc(logoX, logoY, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, logoX - radius, logoY - radius, radius * 2, radius * 2);
      ctx.restore();
    }
  } catch (e) {
    console.warn("Logo draw fallback", e);
  }

  ctx.textAlign = 'center';

  // Followed by "।।सत्यनाम।।" in red color
  ctx.font = 'bold 26px "Noto Serif", serif';
  ctx.fillStyle = '#8B0000';
  ctx.fillText('।।सत्यनाम।।', 600, 175);

  // 3. TITLE & SUBTITLE
  // "पावन स्वाध्याय आशीर्वाद पत्र" centered in a large, bold maroon font
  ctx.font = 'bold 42px "Noto Serif", serif';
  ctx.fillStyle = '#701A07';
  ctx.fillText('पावन स्वाध्याय आशीर्वाद पत्र', 600, 235);

  // "श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ — साहेब वर्ल्ड" centered in smaller italicized grey/black font
  ctx.font = 'italic 500 20px "Noto Sans", sans-serif';
  ctx.fillStyle = '#4A4A4A';
  ctx.fillText('श्री सद्गुरु कबीर साहेब स्वाध्याय पीठ — साहेब वर्ल्ड', 600, 275);

  // Divider
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = '#D4AF37';
  ctx.beginPath();
  ctx.moveTo(380, 295);
  ctx.lineTo(820, 295);
  ctx.stroke();

  // 4. CERTIFICATION TEXT
  ctx.font = '500 20px "Noto Sans", sans-serif';
  ctx.fillStyle = '#2C1E11';
  ctx.fillText('सप्रेम प्रमाणित किया जाता है कि परम श्रद्धालु हंस जन:', 600, 350);

  // [User_Name_Dynamic] centered in a large bold red font
  const effectiveName = userName.trim() || 'सत्य साधक (हंस जन)';
  ctx.font = 'bold 34px "Noto Serif", serif';
  ctx.fillStyle = '#8B0000';
  ctx.fillText(effectiveName, 600, 405);

  ctx.font = '500 18px "Noto Sans", sans-serif';
  ctx.fillStyle = '#2C1E11';
  ctx.fillText('ने सद्गुरु कबीर साहेब के पावन ११-चरणीय स्वाध्याय एवं अंतःकरण सत्संग को', 600, 455);
  ctx.fillText('पूर्ण श्रद्धा, एकाग्रता एवं सत्य-संकल्प के साथ संपन्न किया है।', 600, 485);

  // 5. SACRED QUOTE BOX
  // Centered golden rectangular frame containing couplet in red/maroon
  const boxX = 220;
  const boxY = 525;
  const boxW = 760;
  const boxH = 100;
  const boxR = 12;

  ctx.save();
  ctx.fillStyle = '#FFFDF8';
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.beginPath();
  if (typeof (ctx as any).roundRect === 'function') {
    (ctx as any).roundRect(boxX, boxY, boxW, boxH, boxR);
  } else {
    ctx.rect(boxX, boxY, boxW, boxH);
  }
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold italic 21px "Noto Serif", serif';
  ctx.fillStyle = '#8B0000';
  ctx.fillText('पूरन भये मनोरथा, सतगुरु दई लखाय।', 600, 565);
  ctx.fillText('कहैं कबीर सो हंस जन, अमरलोक में जाय।।', 600, 595);
  ctx.restore();

  // 6. FOOTER
  // Left side: "दिनांक: [Current_Date_Dynamic]"
  // Right side: "।। साहेब बंदगी साहेब ।। 🙏"
  ctx.font = 'bold 18px "Noto Sans", sans-serif';
  ctx.fillStyle = '#5C4033';
  ctx.textAlign = 'left';
  ctx.fillText(`दिनांक: ${date}`, 95, 685);

  ctx.textAlign = 'right';
  ctx.fillText('।। साहेब बंदगी साहेब ।। 🙏', 1105, 685);

  // Trigger Instant PNG Download directly from browser
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `Saheb_World_Ashirwad_Patra_${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}
