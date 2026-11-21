// Expert HTML5 Canvas Sakhi Card & Wallpaper Generator
// Generates Format 1 (Parchment Card) and Format 2 (Scenic Nature Wallpaper) with exact spelling "सत्यनाम"

import divineSunriseWallpaper from '../assets/images/divine_sunrise_wallpaper.jpg';
import sacredRiverTwilightWallpaper from '../assets/images/sacred_river_twilight_wallpaper.jpg';
import cleanScenicWallpaper from '../assets/images/clean_scenic_wallpaper.jpg';
import sacredForestWallpaper from '../assets/images/sacred_forest_wallpaper.jpg';

interface SakhiCardData {
  titleHi: string;
  titlePa?: string;
  coupletHi: string;
  coupletPa?: string;
  coupletEn?: string;
  bhavarthHi: string;
  bhavarthPa?: string;
  bhavarthEn?: string;
  sakhiNumber?: string;
}

export async function generateAndDownloadSakhiCard(
  data: SakhiCardData,
  format: 'parchment' | 'scenic' = 'parchment',
  lang: 'hi' | 'pa' | 'en' = 'hi',
  scenicVariant: 'sunrise' | 'twilight' | 'forest' = 'sunrise'
): Promise<string | null> {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080; // Standard 1:1 IG / WhatsApp HD Format
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const getLocalizedText = () => {
    if (lang === 'pa') {
      return {
        topCallout: '🌹 ।। ਸਤਯਨਾਮ ।। 🌹',
        subtitle: 'ਬੰਦੀਛੋੜ ਸਤਿਗੁਰੂ ਕਬੀਰ ਸਾਹਿਬ',
        sakhiLabel: `ਸਾਖੀ #${data.sakhiNumber || '103'} • ਸਾਖੀ ਸੰਗ੍ਰਹਿ`,
        heading: '॥ ਮੂਲ ਪਾਵਨ ਸਾਖੀ ਬਾਣੀ ॥',
        couplet: data.coupletPa || data.coupletHi,
        transliteration: data.coupletEn || '',
        bhavarthHeading: 'ਭਾਵਾਰਥ (Essence):',
        bhavarth: data.bhavarthPa || data.bhavarthHi,
        footer: '।। ਸਾਹਿਬ ਬੰਦਗੀ ਸਾਹਿਬ ।। 🙏',
        brand: 'ਸਾਹਿਬ ਵਰਲਡ'
      };
    } else if (lang === 'en') {
      return {
        topCallout: '🌹 ।। Satyanaam ।। 🌹',
        subtitle: 'Bandichhor Satguru Kabir Saheb',
        sakhiLabel: `Sakhi #${data.sakhiNumber || '103'} • Sakhi Sangrah`,
        heading: '॥ Sacred Kabir Sakhi ॥',
        couplet: data.coupletEn || data.coupletHi,
        transliteration: data.coupletHi,
        bhavarthHeading: 'Essence & Meaning:',
        bhavarth: data.bhavarthEn || data.bhavarthHi,
        footer: '।। Saheb Bandagi Saheb ।। 🙏',
        brand: 'Saheb World'
      };
    } else {
      return {
        topCallout: '🌹 ।। सत्यनाम ।। 🌹',
        subtitle: 'बंदीछोड़ सत्गुरु कबीर साहेब',
        sakhiLabel: `साखी #${data.sakhiNumber || '103'} • साखी संग्रह`,
        heading: '॥ मूल पावन साखी वाणी ॥',
        couplet: data.coupletHi,
        transliteration: data.coupletEn || '',
        bhavarthHeading: 'भावार्थ (Essence):',
        bhavarth: data.bhavarthHi,
        footer: '।। साहेब बन्दगी साहेब ।। 🙏',
        brand: 'साहेब वर्ल्ड'
      };
    }
  };

  const t = getLocalizedText();

  // Robust Centered Multiline Word-Wrapper (Guarantees text NEVER overflows canvas boundaries)
  const drawCenteredWrappedText = (
    text: string,
    centerX: number,
    startY: number,
    lineHeight: number,
    maxWidth: number,
    maxLines: number = 6
  ) => {
    const rawParagraphs = text.split('\n');
    let currentY = startY;
    let linesDrawn = 0;

    for (const para of rawParagraphs) {
      if (!para.trim()) continue;
      const words = para.trim().split(/\s+/);
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = currentLine ? `${currentLine} ${words[i]}` : words[i];
        const metrics = ctx.measureText(testLine);

        if (metrics.width > maxWidth && i > 0) {
          if (linesDrawn < maxLines) {
            ctx.fillText(currentLine, centerX, currentY);
            currentY += lineHeight;
            linesDrawn++;
          }
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine && linesDrawn < maxLines) {
        ctx.fillText(currentLine, centerX, currentY);
        currentY += lineHeight;
        linesDrawn++;
      }
    }
    return currentY;
  };

  if (format === 'scenic') {
    // FORMAT 2: Scenic Nature Wallpaper (Selection of 3 pristine nature backgrounds)
    const grad = ctx.createLinearGradient(0, 0, 0, 1080);
    grad.addColorStop(0, '#121F0D');
    grad.addColorStop(0.5, '#2A3C1B');
    grad.addColorStop(1, '#150A05');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    // Choose primary background image based on selected scenicVariant
    const primaryImg =
      scenicVariant === 'twilight'
        ? sacredRiverTwilightWallpaper
        : scenicVariant === 'forest'
        ? sacredForestWallpaper
        : divineSunriseWallpaper;

    const scenicImages = [primaryImg, divineSunriseWallpaper, sacredRiverTwilightWallpaper, cleanScenicWallpaper, sacredForestWallpaper];

    for (const imgSrc of scenicImages) {
      try {
        const bgImg = new Image();
        bgImg.src = imgSrc;
        await new Promise<void>((resolve) => {
          if (bgImg.complete) {
            resolve();
          } else {
            bgImg.onload = () => resolve();
            bgImg.onerror = () => resolve();
            setTimeout(resolve, 1200);
          }
        });

        if (bgImg.complete && bgImg.naturalWidth > 0) {
          ctx.drawImage(bgImg, 0, 0, 1080, 1080);
          break;
        }
      } catch {
        // Fallback
      }
    }

    // Dynamic vignette overlay for pristine text readability
    const vGrad = ctx.createLinearGradient(0, 0, 0, 1080);
    vGrad.addColorStop(0, 'rgba(10, 5, 2, 0.78)');
    vGrad.addColorStop(0.3, 'rgba(0, 0, 0, 0.42)');
    vGrad.addColorStop(0.62, 'rgba(0, 0, 0, 0.58)');
    vGrad.addColorStop(1, 'rgba(5, 2, 0, 0.94)');
    ctx.fillStyle = vGrad;
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.textAlign = 'center';
    
    // Top Callout (Glow)
    ctx.font = 'bold 44px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = 'rgba(0,0,0,0.95)';
    ctx.shadowBlur = 18;
    ctx.fillText(t.topCallout, 540, 95);

    ctx.font = '600 22px "Noto Sans", "Devanagari", "Gurmukhi", sans-serif';
    ctx.fillStyle = '#FFECB3';
    ctx.shadowBlur = 10;
    ctx.fillText(t.subtitle, 540, 138);

    // Couplet Text in Golden-White Crisp Typography with Safe Word Wrapping
    ctx.font = lang === 'en' ? 'bold 26px "Noto Sans", sans-serif' : 'bold 36px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 16;
    
    drawCenteredWrappedText(t.couplet, 540, 290, lang === 'en' ? 42 : 54, 680, 6);

    // Transliteration line if available
    if (t.transliteration) {
      ctx.font = 'italic 20px "Noto Sans", sans-serif';
      ctx.fillStyle = '#FFD700';
      ctx.shadowBlur = 10;
      const cleanTrans = t.transliteration.replace(/\n/g, ' ');
      ctx.fillText(`"${cleanTrans.length > 90 ? cleanTrans.slice(0, 87) + '...' : cleanTrans}"`, 540, 535, 720);
    }

    // Bhavarth at bottom center glassmorphic card overlay (LARGE 24px BOLD FONT)
    const boxX = 65;
    const boxY = 580;
    const boxW = 950;
    const boxH = 265;
    const boxR = 20;

    ctx.fillStyle = 'rgba(12, 9, 6, 0.92)';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 18;
    ctx.shadowColor = 'rgba(0,0,0,0.85)';
    ctx.beginPath();
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(boxX, boxY, boxW, boxH, boxR);
    } else {
      ctx.rect(boxX, boxY, boxW, boxH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.font = 'bold 28px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(t.bhavarthHeading, 540, boxY + 42);

    // Large 26px Bold Bhavarth Text (Requested boost)
    ctx.font = '600 26px "Noto Sans", "Devanagari", "Gurmukhi", sans-serif';
    ctx.fillStyle = '#FFFFFF';
    
    const words = t.bhavarth.split(' ');
    let line = '';
    let lineArray: string[] = [];
    let maxWidth = boxW - 70;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lineArray.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lineArray.push(line);

    lineArray.forEach((l, idx) => {
      if (idx < 5) {
        ctx.fillText(l.trim(), 540, boxY + 82 + (idx * 40));
      }
    });

    // Footer
    ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
    ctx.shadowBlur = 14;
    ctx.font = 'bold 34px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#FFD700';
    ctx.fillText(t.footer, 540, 935);

    ctx.font = 'bold 20px "Noto Sans", "Gurmukhi", sans-serif';
    ctx.fillStyle = '#E5C158';
    ctx.fillText(t.brand, 540, 980);
    ctx.shadowBlur = 0;

  } else {
    // FORMAT 1: Parchment Card (Classic sacred manuscript format)
    ctx.fillStyle = '#FFFDF9';
    ctx.fillRect(0, 0, 1080, 1080);

    // Soft parchment inner fill
    ctx.fillStyle = '#FAF4E8';
    ctx.fillRect(40, 40, 1000, 1000);

    // Outer double golden & maroon border
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#D4AF37';
    ctx.strokeRect(40, 40, 1000, 1000);

    ctx.lineWidth = 3;
    ctx.strokeStyle = '#8B0000';
    ctx.strokeRect(60, 60, 960, 960);

    ctx.textAlign = 'center';

    // Top Header
    ctx.font = 'bold 36px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#8B0000';
    ctx.fillText(t.topCallout, 540, 120);

    ctx.font = '600 22px "Noto Sans", "Devanagari", "Gurmukhi", sans-serif';
    ctx.fillStyle = '#5C4033';
    ctx.fillText(t.subtitle, 540, 160);

    // Divider
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#D4AF37';
    ctx.beginPath();
    ctx.moveTo(320, 185);
    ctx.lineTo(760, 185);
    ctx.stroke();

    // Sakhi ID Badge
    ctx.font = 'bold 24px "Noto Sans", "Devanagari", "Gurmukhi", sans-serif';
    ctx.fillStyle = '#B8860B';
    ctx.fillText(t.sakhiLabel, 540, 225);

    // Heading
    ctx.font = 'bold 26px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#8B0000';
    ctx.fillText(t.heading, 540, 268);

    // Couplet Text in Crimson Typography with Safe Word Wrapping
    ctx.font = lang === 'en' ? 'bold 25px "Noto Sans", sans-serif' : 'bold 34px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#701A07';
    
    drawCenteredWrappedText(t.couplet, 540, 325, lang === 'en' ? 40 : 50, 660, 6);

    // Divider line
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#D4AF37';
    ctx.beginPath();
    ctx.moveTo(260, 480);
    ctx.lineTo(820, 480);
    ctx.stroke();

    // Transliteration if available
    if (t.transliteration) {
      ctx.font = 'italic 19px "Noto Sans", sans-serif';
      ctx.fillStyle = '#5C4033';
      const cleanTrans = t.transliteration.replace(/\n/g, ' ');
      ctx.fillText(`"${cleanTrans.length > 90 ? cleanTrans.slice(0, 87) + '...' : cleanTrans}"`, 540, 515, 720);
    }

    // Bhavarth Box (LARGE 24px BOLD FONT)
    const boxX = 80;
    const boxY = 550;
    const boxW = 920;
    const boxH = 315;
    const boxR = 18;

    ctx.save();
    ctx.fillStyle = '#FFF9F0';
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(boxX, boxY, boxW, boxH, boxR);
    } else {
      ctx.rect(boxX, boxY, boxW, boxH);
    }
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 26px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#8B0000';
    ctx.textAlign = 'left';
    ctx.fillText(t.bhavarthHeading, boxX + 35, boxY + 45);

    // Large 24px Bold Bhavarth Text
    ctx.font = '600 24px "Noto Sans", "Devanagari", "Gurmukhi", sans-serif';
    ctx.fillStyle = '#2C1E11';
    ctx.textAlign = 'left';
    
    const words = t.bhavarth.split(' ');
    let line = '';
    let lineArray: string[] = [];
    let maxWidth = boxW - 70;

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lineArray.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lineArray.push(line);

    lineArray.forEach((l, idx) => {
      if (idx < 5) {
        ctx.fillText(l.trim(), boxX + 35, boxY + 90 + (idx * 38));
      }
    });

    ctx.restore();

    // Footer
    ctx.textAlign = 'center';
    ctx.font = 'bold 28px "Noto Serif", "Devanagari", "Gurmukhi", serif';
    ctx.fillStyle = '#B8860B';
    ctx.fillText(t.footer, 540, 935);

    ctx.font = 'bold 20px "Noto Sans", "Devanagari", "Gurmukhi", sans-serif';
    ctx.fillStyle = '#701A07';
    ctx.fillText(t.brand, 540, 975);
  }

  // Trigger Download via Blob URL + Return Data URL
  try {
    const dataUrl = canvas.toDataURL('image/png');
    const fileName = `SahebWorld_Sakhi_${format}_${Date.now()}.png`;

    if (typeof canvas.toBlob === 'function') {
      canvas.toBlob((blob) => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.download = fileName;
          link.href = blobUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
        }
      }, 'image/png');
    } else {
      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return dataUrl;
  } catch (err) {
    console.error("Canvas download error:", err);
    return null;
  }
}
