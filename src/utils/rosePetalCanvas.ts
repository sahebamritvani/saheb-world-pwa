// HTML5 Canvas Rose Petal Varsha (Falling Sacred Petals Animation)
// Ultra-lightweight, 60fps, zero-dependency mobile-friendly canvas engine

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spin: number;
  color: string;
  opacity: number;
}

export function startRosePetalVarsha(durationMs = 6000): () => void {
  // Create or retrieve full-screen overlay canvas
  let canvas = document.getElementById('rose-petal-canvas') as HTMLCanvasElement;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'rose-petal-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const colors = [
    '#E11D48', // Crimson Red
    '#BE123C', // Deep Rose
    '#FB7185', // Soft Rose Pink
    '#F43F5E', // Bright Rose
    '#D97706'  // Golden Saffron accent
  ];

  const totalPetals = Math.min(65, Math.floor(window.innerWidth / 12));
  const petals: Petal[] = [];

  for (let i = 0; i < totalPetals; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height,
      size: 10 + Math.random() * 14,
      speedY: 1.5 + Math.random() * 2.8,
      speedX: (Math.random() - 0.5) * 1.8,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.05,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 0.75 + Math.random() * 0.25
    });
  }

  let animationFrameId: number;
  let running = true;
  const startTime = Date.now();

  const drawPetal = (p: Petal) => {
    if (!ctx) return;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.angle);
    ctx.beginPath();
    // Organic teardrop/petal shape
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, -p.size / 4, p.size, p.size / 2);
    ctx.bezierCurveTo(p.size, p.size, p.size / 2, p.size * 1.3, 0, p.size * 1.4);
    ctx.bezierCurveTo(-p.size / 2, p.size * 1.3, -p.size, p.size, -p.size, p.size / 2);
    ctx.bezierCurveTo(-p.size, -p.size / 4, -p.size / 2, -p.size / 2, 0, 0);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity;
    ctx.fill();
    ctx.restore();
  };

  const render = () => {
    if (!running || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.angle) * 0.8;
      p.angle += p.spin;

      if (p.y > canvas.height + 30) {
        // Reset to top if within duration
        if (Date.now() - startTime < durationMs) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      }
      drawPetal(p);
    }

    if (Date.now() - startTime < durationMs + 2000) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cleanup();
    }
  };

  const cleanup = () => {
    running = false;
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
    if (canvas && canvas.parentNode) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.parentNode.removeChild(canvas);
    }
  };

  animationFrameId = requestAnimationFrame(render);
  return cleanup;
}
